"use client";
import { convertToSlug } from "@constants";
import Picture from "@src/components/picture/Picture";
import { FormatMoney2 } from "@src/components/Reusables/FormatMoney";
import { useCategories, WooCommerce } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useCart } from "react-use-cart";

export const Loader = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="h-9 bg-gray-200 rounded w-full" />
      </div>
    ))}
  </div>
);

const SortedProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([]);
  const [popularProducts, setPopularProducts] = useState<ProductType[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { addItem, getItem } = useCart();

  // Fetch sale products (on_sale) and popular products (by popularity)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const [saleRes, popularRes] = await Promise.all([
          WooCommerce.get(
            "products?on_sale=true&per_page=6&orderby=date&order=desc",
          ),
          WooCommerce.get("products?orderby=popularity&per_page=8&order=desc"),
        ]);
        if (saleRes?.data) setSaleProducts(saleRes.data);
        if (popularRes?.data) setPopularProducts(popularRes.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* ─── Popular Products (Hot Products) Section ─── */}
      <div className="relative w-full bg-white py-16 sm:py-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-40 h-24 bg-primary-200/20 rounded-t-full -rotate-45 pointer-events-none hidden xl:block" />
        <div className="absolute top-1/2 -right-10 w-32 h-20 border-2 border-gray-200 rounded-full pointer-events-none hidden xl:block" />

        <div className="max-w-[1256px] mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-[0.6em] mb-4">
              Our Products
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-primary-300 tracking-tight">
              New Collections
            </h2>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {isLoading ?
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-100 rounded-xl mb-5" />
                  <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              ))
            : popularProducts.slice(0, 8).map((product: ProductType) => {
                const price = parseInt(product?.price || "0");
                const slugDesc = convertToSlug(product?.name);
                const ID = product?.id?.toString();
                const cartItem = getItem(ID);

                return (
                  <div key={product.id} className="group flex flex-col">
                    {/* Image Container */}
                    <Link
                      href={`/home-item/product/${slugDesc}-${product.id}`}
                      className="relative aspect-square bg-[#F5F5F5] rounded-xl overflow-hidden flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-[1.02]">
                      <Picture
                        src={product?.images?.[0]?.src}
                        alt={product?.name}
                        className="object-contain w-[75%] h-[75%] group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Floating Quick Action (Add to Cart) */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addItem({
                            id: ID,
                            name: product?.name,
                            price,
                            quantity: 1,
                            image: product?.images?.[0]?.src,
                          });
                        }}
                        className={`absolute bottom-4 right-4 size-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${cartItem ? "bg-emerald-500 text-white" : "bg-white text-black hover:bg-black hover:text-white"}`}>
                        {cartItem ? "✓" : "+"}
                      </button>
                    </Link>

                    {/* Product Info Row */}
                    <div className="flex items-start justify-between gap-4 px-1">
                      <Link
                        href={`/home-item/product/${slugDesc}-${product.id}`}
                        className="text-[11px] sm:text-xs font-bold text-primary-300 uppercase tracking-wider hover:opacity-80 transition-opacity line-clamp-1 flex-1"
                        dangerouslySetInnerHTML={{
                          __html: product?.name,
                        }}
                      />
                      <span className="text-[11px] sm:text-xs font-bold text-black whitespace-nowrap">
                        {price ?
                          <FormatMoney2 value={price} />
                        : "N/A"}
                      </span>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>

      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default SortedProducts;
