import Store, { Options } from 'electron-store';
import { z, ZodSchema } from 'zod';
import fs from 'fs';

export class TypedStore<T extends Record<string, any>> {
  private store: Store<T>;
  private schema: ZodSchema<T>;

  constructor(schema: ZodSchema<T>, options: Options<T>) {
    this.schema = schema;
    const storePath = options.cwd ? `${options.cwd}/${options.name}.json` : new Store<T>().path;

    try {
      this.store = new Store<T>(options);
    } catch (error) {
      if (error instanceof SyntaxError) {
        if (fs.existsSync(storePath)) {
          fs.unlinkSync(storePath);
        }
        this.store = new Store<T>(options);
      } else {
        throw error;
      }
    }
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.store.get(key);
  }

  public set<K extends keyof T>(key: K, value: T[K]) {
    const partialData = { [key]: value };
    const validationResult = this.schema.partial().safeParse(partialData);

    if (validationResult.success) {
      this.store.set(key, value);
    } else {
      console.error('Validation error:', validationResult.error);
    }
  }

  public storeAll(data: T) {
    const validationResult = this.schema.safeParse(data);

    if (validationResult.success) {
      this.store.set(data);
    } else {
      console.error('Validation error:', validationResult.error);
    }
  }
}
