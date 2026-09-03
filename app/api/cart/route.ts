import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { cartItems } from "../../../db/schema";
import { getChatGPTUser } from "../../chatgpt-auth";

export const dynamic = "force-dynamic";

const PRODUCT_IDS = new Set([1, 2, 3, 4, 5, 6]);

type CartItem = {
  productId: number;
  quantity: number;
};

function unavailable() {
  return Response.json(
    { error: "購物車目前無法連線，請稍後再試。" },
    { status: 503 },
  );
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json({ error: "請先登入會員。" }, { status: 401 });
  }

  try {
    const db = await getDb();
    const result = await db
      .select({
        productId: cartItems.productId,
        quantity: cartItems.quantity,
      })
      .from(cartItems)
      .where(eq(cartItems.userId, user.id))
      .orderBy(desc(cartItems.updatedAt));

    return Response.json({ items: result });
  } catch (error) {
    console.error("Unable to load cart", error);
    return unavailable();
  }
}

export async function PUT(request: Request) {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json({ error: "請先登入會員。" }, { status: 401 });
  }

  let body: { items?: CartItem[] };
  try {
    body = (await request.json()) as { items?: CartItem[] };
  } catch {
    return Response.json({ error: "購物車資料格式不正確。" }, { status: 400 });
  }

  if (
    !Array.isArray(body.items) ||
    body.items.length > PRODUCT_IDS.size ||
    body.items.some(
      (item) =>
        !Number.isInteger(item.productId) ||
        !PRODUCT_IDS.has(item.productId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 99,
    )
  ) {
    return Response.json({ error: "購物車資料格式不正確。" }, { status: 400 });
  }

  const uniqueItems = new Map<number, number>();
  for (const item of body.items) uniqueItems.set(item.productId, item.quantity);
  if (uniqueItems.size !== body.items.length) {
    return Response.json({ error: "購物車資料格式不正確。" }, { status: 400 });
  }

  try {
    const db = await getDb();
    const removeCurrent = db
      .delete(cartItems)
      .where(eq(cartItems.userId, user.id));

    if (body.items.length === 0) {
      await removeCurrent;
    } else {
      await db.batch([
        removeCurrent,
        db.insert(cartItems).values(
          body.items.map((item) => ({
            userId: user.id,
            productId: item.productId,
            quantity: item.quantity,
          })),
        ),
      ]);
    }

    return Response.json({ items: body.items });
  } catch (error) {
    console.error("Unable to save cart", error);
    return unavailable();
  }
}
