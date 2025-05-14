import { ColumnMeta as CustomColumnMeta } from './interface';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> extends CustomColumnMeta {}
}
