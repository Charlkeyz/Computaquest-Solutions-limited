"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import { heroBg, heroImage, heroImage2, heroImage3 } from "@public/images";
import HeroCarousel from "../Cards/HeroCarousel";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { useCart } from "react-use-cart";
import TrustBadges from "./TrustBadges";
import BuyAccessories from "./BuyAccessories";
import { LeafIconSvg, SparkleIconSvg } from "../SvgIcons";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { addItem, getItem } = useCart();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;
  const TotalCatgory = Categories?.length - 1;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`,
              );

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0 ?
                  response?.data[0]?.images[0]?.src
                : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage, // Store the first product's image
              };
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {},
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  // Fetch latest products for New Arrivals
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await WooCommerce.get(
          "products?orderby=date&order=desc&per_page=8",
        );
        if (response?.data) {
          setLatestProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };
    fetchLatestProducts();
  }, []);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  return (
    <>
      {/* Hero Concept inspired by the image */}
      <div className="relative w-full h-[95vh] overflow-hidden bg-primary-100">
        {/* The Background Image */}
        <Picture
          src={heroBg}
          alt="Brand New Collection"
          className="w-full h-full object-cover scale-105"
        />

        {/* Content Overlay — Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-20">
          <p className="text-[10px] md:text-xs font-bold text-black uppercase tracking-[0.6em] mb-8">
            Objects of Desire
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-black leading-[1.1] tracking-tighter mb-8 max-w-4xl">
            You Will Love <br className="hidden md:block" />
            This Awesome <br className="hidden md:block" />
            Handcraft
          </h1>

          <p className="text-sm md:text-base text-black/80 max-w-xl leading-relaxed mb-10 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo
            enim sit amet magna semper lacinia. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. In commodo enim sit amet.
          </p>

          <Link
            href="/category"
            className="inline-block bg-[#EAEAEA] hover:bg-white text-black text-xs md:text-sm font-bold uppercase tracking-widest px-12 py-4 rounded-lg transition-all shadow-lg hover:scale-105 active:scale-95">
            Explore
          </Link>

          {/* Decorative Sparkles (inspired by design) */}
          <div className="absolute top-1/2 left-[20%] -translate-y-1/2 hidden lg:block">
            <SparkleIconSvg className="text-white animate-pulse" />
          </div>
          <div className="absolute top-[60%] right-[30%] hidden lg:block">
            <SparkleIconSvg
              className="text-white animate-pulse size-4"
              style={{ animationDelay: "1s" }}
            />
          </div>
          <div className="absolute bottom-[20%] right-[25%] hidden lg:block">
            <SparkleIconSvg className="text-white animate-bounce-slow size-8" />
          </div>
        </div>

        {/* Decorative Leaf (Artistic element in design) */}
        <div className="absolute bottom-0 left-[25%] opacity-30 pointer-events-none hidden xl:block">
          <LeafIconSvg className="text-black" />
        </div>
      </div>

      <TrustBadges />

      {/* ─── Hot Products (New Arrivals) Section ─── */}
      <div className="relative w-full bg-white py-16 sm:py-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-40 h-24 bg-primary-200/20 rounded-t-full -rotate-45 pointer-events-none hidden xl:block" />
        <div className="absolute top-1/2 -right-10 w-32 h-20 border-2 border-gray-200 rounded-full pointer-events-none hidden xl:block" />
        <div className="absolute bottom-40 -left-10 w-32 h-16 border-2 border-gray-100 rounded-full pointer-events-none hidden xl:block" />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-gray-100 rounded-full pointer-events-none hidden xl:block" />

        <div className="max-w-[1256px] mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-[0.6em] mb-4">
              Our Products
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#8BA79F] tracking-tight">
              Hot Products
            </h2>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {latestProducts.length > 0 ?
              latestProducts.slice(0, 8).map((product: ProductType) => {
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
                        className="text-[11px] sm:text-xs font-bold text-[#8BA79F] uppercase tracking-wider hover:opacity-80 transition-opacity line-clamp-1 flex-1"
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
            : Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-100 rounded-xl mb-5" />
                  <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              ))
            }
          </div>

          <div className="flex justify-center mt-20">
            <Link
              href="/category"
              className="bg-[#D9DEDC] hover:bg-gray-200 text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest px-12 py-4 rounded-lg transition-all shadow-sm">
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCategorySection;
