const prisma = require("../prisma");
const seed = async () => {

  const employees = [
    {name: "Tony Gunk"},
    {name: "Janky Greg"},
    {name: "Turd Furguson"},
    {name: "Chim Richards"},
    {name: "Johnny Boy"},
    {name: "Billy Pilgram"},
    {name: "Sponge Bob"},
    {name: "Hingle McCringleberry"},
    {name: "Quatro Quatro"},
    {name: "Sequester Grundelplith, M.D."}
 ]

 await prisma.employee.createMany({ data: employees });
};

seed()
.then(async () => await prisma.$disconnect())
.catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});