const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const Necklaces = await prisma.category.create({
    data: {
      name: "Necklaces",
      slug: "necklaces",
    },
  });
  const Earrings = await prisma.category.create({
    data: {
      name: "Earrings",
      slug: "earrings",
    },
  });
  const Rings = await prisma.category.create({
    data: {
      name: "Rings",
      slug: "rings",
    },
  });
  const Bracelets = await prisma.category.create({
    data: {
      name: "Bracelets",
      slug: "bracelets",
    },
  });
  const Anklets = await prisma.category.create({
    data: {
      name: "Anklets",
      slug: "anklets",
    },
  });
  const gold_18 = await prisma.element.create({
    data: {
      id: "gold_18",
      name: "Gold 18 Karat",
      price: 20000,
    },
  });
  const gold_22 = await prisma.element.create({
    data: {
      id: "gold_22",
      name: "Gold 22 Karat",
      price: 22000,
    },
  });
  const gold_24 = await prisma.element.create({
    data: {
      id: "gold_24",
      name: "Gold 24 Karat",
      price: 24000,
    },
  });
  const silver = await prisma.element.create({
    data: {
      id: "silver_plated",
      name: "Silver Plated",
      price: 10000,
    },
  });
  const artificial = await prisma.element.create({
    data: {
      id: "artificial",
      name: "Artificial",
      price: 10000,
    },
  });

  console.log({
    Necklaces,
    Earrings,
    Rings,
    Bracelets,
    Anklets,
    gold_18,
    gold_22,
    gold_24,
    silver,
    artificial,
  });
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
//ts-node prisma/seed.ts
