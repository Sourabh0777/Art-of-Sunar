import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const response = await prisma.element.findMany();
    if (response) {
      return Response.json(response);
    }
  } catch (error) {
    console.log(error);
    return new Response("Could not fetch elements", { status: 500 });
  }
}
