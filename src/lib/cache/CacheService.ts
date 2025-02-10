/* eslint-disable no-console */
import { IDBPDatabase, openDB } from 'idb';
import { dbNames } from '@/lib/cache/constants.ts';
import { TCacheNames } from '@/lib/cache/types.ts';

const DB_NAME = 'bookDiaryCache';
const STORE_VERSION = 1;

interface CacheOptions {
  ttl?: number | null; // Время жизни данных в миллисекундах (опционально)
}

class CacheService {
  private readonly dbName: string;

  constructor(dbName = DB_NAME) {
    this.dbName = dbName;
    this.init();
  }

  private async init() {
    try {
      const db = await this.getDB();
      this.cleanupExpiredEntries(db);
    } catch (error) {
      console.error('IndexedDB не доступен:', error);
      throw error;
    }
  }

  private async getDB() {
    return openDB(this.dbName, STORE_VERSION, {
      upgrade(db) {
        dbNames.forEach((name) => {
          if (!db.objectStoreNames.contains(name)) {
            db.createObjectStore(name);
          }
        });
      },
    });
  }

  async set<T>(
    storeName: TCacheNames,
    key: string,
    value: T,
    options: CacheOptions = { ttl: 1000 * 60 * 60 * 24 },
  ) {
    try {
      const db = await this.getDB();
      const dataToStore = {
        value,
        timestamp: Date.now(),
        ttl: options.ttl ?? null,
      };
      await db.put(storeName, dataToStore, key);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
      throw error;
    }
  }

  async get<T>(storeName: TCacheNames, key: string): Promise<T | null> {
    try {
      const db = await this.getDB();
      const storedData = await db.get(storeName, key);
      if (storedData && this.isValid(storedData)) {
        return storedData.value;
      }
      return null;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return null;
    }
  }

  async delete(storeName: TCacheNames, key: string) {
    try {
      const db = await this.getDB();
      await db.delete(storeName, key);
    } catch (error) {
      console.error(
        `Ошибка при удалении ключа ${key} в хранилище кэща ${storeName}:`,
        error,
      );
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isValid(data: any) {
    return !data.ttl || Date.now() - data.timestamp < data.ttl;
  }

  async clear(storeName: TCacheNames) {
    try {
      const db = await this.getDB();
      await db.clear(storeName);
    } catch (error) {
      console.error(`Ошибка при очистке кэша: ${storeName}`, error);
      throw error;
    }
  }

  private async cleanupExpiredEntries(db: IDBPDatabase) {
    try {
      for (const storeName of dbNames) {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const keys = await store.getAllKeys();

        for (const key of keys) {
          const data = await store.get(key);
          if (data && !this.isValid(data)) {
            await store.delete(key);
          }
        }
      }
    } catch (error) {
      console.error('Ошибка при очистке устаревших данных:', error);
      throw error;
    }
  }
}

export const cache = new CacheService();
