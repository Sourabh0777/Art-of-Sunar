export const createRow = async (tableName: any, data: any) => {
  try {
    const result = await tableName.create({
      data: data,
    });
    return result;
  } catch (error) {
    throw new Error("Error Occurred createRow");
  }
};

export const findMany = async (tableName: any) => {
  try {
    const result = await tableName.findMany();
    return result;
  } catch (error) {
    throw new Error("Error Occurred findMany");
  }
};
export const findUnique = async (tableName: any, where: any) => {
  try {
    const result = await tableName.findUnique({ where: where });
    return result;
  } catch (error: any) {
    throw new Error("Error Occurred findUnique");
  }
};
export const updateRow = async (tableName: any, where: any, data: any) => {
  try {
    const result = await tableName.update({
      data: data,
      where: where,
    });
    return result;
  } catch (error) {
    throw new Error("Error Occurred updateRow");
  }
};
//Check if the  already exists then update
export const alreadyExistsThenUpdate = async (tableName: any, where: any, data: any) => {
  try {
    const alreadyExists = await findUnique(tableName, where);
    if (alreadyExists) {
      const update = await updateRow(tableName, where, data);
      return update;
    }
  } catch (error) {
    console.log("🚀 ~ alreadyExistsThenUpdate ~ error:", error);
    throw new Error("Error Occurred alreadyExistsThenUpdate");
  }
};
//Check if already exist if not then create
export const alreadyExistsIfNotThenCreate = async (tableName: any, where: any, data: any) => {
  try {
    const alreadyExists = await findUnique(tableName, where);
    if (!alreadyExists) {
      const create = await createRow(tableName, data);
      return create;
    }
  } catch (error) {
    throw new Error("Error Occurred alreadyExistsIfNotThenCreate");
  }
};
