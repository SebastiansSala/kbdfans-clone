import { CategorySectionProps } from "@/types/types";
import ShopnowLink from "./ShopnowLink";

const CategorySection = async ({
  text,
  href,
  promise,
}: CategorySectionProps) => {
    
  const products = await promise;

  return (
    <section className="py-10">
      <div className="text-center">
        <h3 className="text-4xl font-semibold">{text}</h3>
        <ShopnowLink href={href} />
      </div>
      <div className="grid grid-cols-5 gap-5"></div>
    </section>
  );
};

export default CategorySection;