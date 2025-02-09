import { IDBPDatabase, openDB } from 'idb';

const DB_NAME = 'appCache';
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
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache');
        }
      },
    });
  }

  async set<T>(
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
      await db.put('cache', dataToStore, key);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
      throw error;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const db = await this.getDB();
      const storedData = await db.get('cache', key);
      if (storedData && this.isValid(storedData)) {
        return storedData.value;
      }
      return null;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isValid(data: any) {
    return !data.ttl || Date.now() - data.timestamp < data.ttl;
  }

  async delete(key: string) {
    try {
      const db = await this.getDB();
      await db.delete('cache', key);
    } catch (error) {
      console.error(`Ошибка при удалении ключа ${key}:`, error);
      throw error;
    }
  }

  async clear() {
    try {
      const db = await this.getDB();
      await db.clear('cache');
    } catch (error) {
      console.error('Ошибка при очистке кэша:', error);
      throw error;
    }
  }

  private async cleanupExpiredEntries(db: IDBPDatabase) {
    try {
      const tx = db.transaction('cache', 'readwrite');
      const store = tx.objectStore('cache');
      const allKeys = await store.getAllKeys();

      const deletePromises = allKeys.map(async (key) => {
        const data = await store.get(key);
        if (data && !this.isValid(data)) {
          await store.delete(key);
        }
      });

      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Ошибка при очистке устаревших данных:', error);
      throw error;
    }
  }
}

export const cache = new CacheService();
