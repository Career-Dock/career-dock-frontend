import SingleProductMainPage from "@/my-components/products/single-product/SingleProductMainPage";

const SingleProductPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return (
    <div className="p-8">
      <SingleProductMainPage id={params?.id} />
    </div>
  );
};

export default SingleProductPage;
