import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("You must be logged in to view orders");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await customFetch.get("/orders", {
        params,
        headers: { Authorization: `Bearer ${user.uid}` },
      });
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error accessing your orders";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect("/login");
      return null;
    }
  };
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const OrdersList = () => {
  const { orders, meta } = useLoaderData();
  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">
        total orders : {meta.pagination.total}
      </h4>
      <div className="overflow-x-auto ">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order.id;
              const { name, address, numItemsInCart, orderTotal, createdAt } =
                order.attributes;
              const date = day(createdAt).format("hh:mm a - MMM Do, YYYY ");
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td className="hidden sm:block">{date}</td>
                  <td>{orderTotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersList;
