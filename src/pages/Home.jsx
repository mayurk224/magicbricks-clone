import React from 'react'
import Header from '../components/Header'
import Carousel from '../sections/Carousel'
import ListingSearchHeader from '../components/ListingSearchHeader'
import Category from '../sections/Category'

export default function Home() {
  return (
    <div className='dark:bg-gray-900'>
        <Header/>
        <div className='mt-16'>
          <Carousel/>
          <div className='my-3 flex-col flex items-center'>
          <label className='text-4xl py-6 text-center'>Find a home you'll Love</label>
          <div className='w-full'>
          <ListingSearchHeader />
          </div>
          </div>
          <div>
            <Category/>
          </div>
        </div>
    </div>
  )
}
