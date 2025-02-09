export type AsyncGeneratorReturnType<T> = {
  pending?: boolean;
  data: T;
};
