import { useMemo } from "react";

import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    formattedPrice: string;
    title: number;
  }>
  onAddToWishList: (id: number) => void;
  totalPrice: number
}

export function SearchResults ({ results, onAddToWishList, totalPrice }: SearchResultsProps) {
  // const totalPrice = useMemo(() => {
  //   return results.reduce((total, product) => {
  //     return total + product.price;
  //   }, 0)
  // }, [results])
  /**
   * though this works, there's still processing power going to the act of 
   * checking whether "results" has changed
   * 
   * there's a better solution
   * 
   * in this case we KNOW that there's really only one way for this to change
   * which is where its data is coming from, the api request
   * 
   * so we don't even need useMemo here
   * 
   * and this can be applied to a lot of things, gotta keep an eye open for these
   * situations
   * 
   * if we have any formatting or calculating to do with data coming from 
   * somewhere, the best way of doing it is immediately after getting it
   * 
   * formatting or calculating stuff directly on the interface is incredibly 
   * inefficient
   */

  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map(product => {
        return (
          <ProductItem 
            key={product.id}
            product={product} 
            onAddToWishList={onAddToWishList}
          />
        );
      })}
    </div>
  )
}