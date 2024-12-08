import SingleProductMainPage from "@/my-components/products/single-product/SingleProductMainPage";

const SingleProductPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="p-8">
      <SingleProductMainPage id={params?.id} />
    </div>
  );
};

export default SingleProductPage;
