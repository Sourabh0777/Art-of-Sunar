import prisma from "@/lib/db";
import {
  createRow,
  findMany,
  findUnique,
  alreadyExistsThenUpdate,
  alreadyExistsIfNotThenCreate,
} from "./prismaFunctions";

export const createDataAndWhere = async (type: string, object: any) => {
  let data, where, functionName, tableName;
  switch (type) {
    case "asd":
      break;
  }
  return { data, where, functionName, tableName };
};
