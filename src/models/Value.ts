import { Model, Schema, model } from 'mongoose';

export const IValueKeys: Array<string> = [
  'codename',
  'entity',
  'synced',
  'info',
  'value',
  'data',
];
export interface IValue {
  codename: string;
  entity: string;
  synced: Date;
  info: string;
  value: number;
  data: any;
}

interface IValueModel extends Model<IValue> {}

const schema = new Schema<IValue>({
  codename: { type: String, index: true, required: true },
  entity: { type: String, index: true, required: true },
  synced: {
    type: Date,
    index: true,
    required: true,
    default: Date.now,
  },
  info: { type: String, index: true, required: true },
  value: { type: Number, index: true, required: true },
  data: { type: Object, index: false, required: false },
});

const Value: IValueModel = model<IValue, IValueModel>('Value', schema);

export default Value;
