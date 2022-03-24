import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: any[];
}

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map((product: { id: any; title: any; price: number | bigint; }) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        formattedPrice: formatter.format(product.price)
      }
    })
    // here we're formatting the price as soon as it gets here from the api
    // which is the best place to do it, since we know that it's not being
    // formatted again with no reason when rendering

    const totalPrice = data.reduce((total: any, product: { price: any; }) => {
      return total + product.price;
    }, 0)
    // same with the totalPrice calculation, no need to do it while rendering

    setResults({totalPrice, data: products});
  }

  const addToWishList = useCallback((id: number) => {
    console.log(id);
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </form>
      
      <SearchResults 
        results={results.data}
        onAddToWishList={addToWishList}
        totalPrice={results.totalPrice}
      />
    </div>
  )
}

export default Home
