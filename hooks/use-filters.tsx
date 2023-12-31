'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'

export default function useFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const current = qs.parse(searchParams.toString())
    const selected = Object.keys(current).map((value) => value)
    setSelectedCategories(selected)
  }, [searchParams])

  const handleClick = (categoryName: string, categoryId: number) => {
    const current = qs.parse(searchParams.toString())
    const categoryIdToString = categoryId.toString()
    const query = {
      ...current,
      [categoryName]: categoryIdToString,
    }

    if (current[categoryName] === categoryIdToString) {
      query[categoryName] = null
      const newSelectedCategories = selectedCategories.filter(
        (id) => id !== categoryName
      )
      setSelectedCategories(newSelectedCategories)
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    )

    router.push(url)
  }

  return {
    selectedCategories,
    handleClick,
  }
}
