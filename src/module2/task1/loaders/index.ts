import expressLoader from './express';
import { initTable } from "./postgres";

export default async ({ expressApp }) => {
  await initTable(); // TODO можно закомментировать при использовании миграций (доделать)
  await expressLoader({ app: expressApp });
};
