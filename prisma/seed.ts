const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const goldItems = await prisma.category.create({
    data: {
      name: "Gold jewellery",
      slug: "gold",
    },
  });
  const SilverItems = await prisma.category.create({
    data: {
      name: "Silver jewellery",
      slug: "silver",
    },
  });
  const Artificial = await prisma.category.create({
    data: {
      name: "Artificial jewellery",
      slug: "artificial",
    },
  });
  const accessories = await prisma.category.create({
    data: {
      name: "Accessories",
      slug: "accessories",
    },
  });

  console.log({ goldItems, SilverItems, Artificial, accessories });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
