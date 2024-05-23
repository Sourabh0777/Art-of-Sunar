import slugify from "slugify";
import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { productSchema } from "@/lib/validators/product";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const data = productSchema.parse(body);

    const slug = slugify(data?.name, {
      lower: true,
    });
    const isProductExist = await prisma.product.findFirst({
      where: {
        slug,
        storeId: params.storeId,
      },
    });

    if (isProductExist) {
      return new Response("You have a product with the same name in this store.", {
        status: 409,
      });
    }
    console.log("🚀 ~ POST ~ data:", data);

    const product = await prisma.product.create({
      data: data,
    });

    return Response.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    console.log(error);

    return new Response("Could not create product, please try again later.", {
      status: 500,
    });
  }
}
