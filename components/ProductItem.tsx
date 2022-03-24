import { memo, useState } from 'react';

import dynamic from 'next/dynamic';

import { AddProductToWishlistProps } from './AddProductToWishlist'
// import { AddProductToWishlist } from './AddProductToWishlist';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import ('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    formattedPrice: string;
    title: number;
  }
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [willAddToWishList, setWillAddToWishList] = useState(false);

  // we can also import functions dynamically
  // async function showFormattedDate() {
  //   const { format } = await import('date-fns')

  //   format()...
  // }

  return (
    <div>
      {product.title} - <strong>{product.formattedPrice}</strong>
      <button onClick={() => {setWillAddToWishList(true)}}>Adicionar aos favoritos</button>

      {willAddToWishList && (
        <AddProductToWishlist
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setWillAddToWishList(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
})
