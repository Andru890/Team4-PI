import { useState } from 'react'

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Categoría 1', checked: false },
    { id: 2, name: 'Categoría 2', checked: false },
    { id: 3, name: 'Categoría 3', checked: false },
    { id: 4, name: 'Categoría 4', checked: false },
  ])

  const handleCheckboxChange = (id) => {
    const updatedCategories = categories.map((category) =>
      category.id === id
        ? { ...category, checked: !category.checked }
        : category
    )
    setCategories(updatedCategories)
  }

  return (
    <div className='flex'>
      <div className='w-64 bg-gray-200 p-4'>
        <h2 className='text-lg font-bold mb-4'>Categorías</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className='mb-2'>
              <label>
                <input
                  type='checkbox'
                  checked={category.checked}
                  onChange={() => handleCheckboxChange(category.id)}
                  className='mr-2'
                />
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex-1 p-4'>
        <h2 className='text-lg font-bold mb-4'>Contenido Principal</h2>
        <p>
          Categorías seleccionadas:{' '}
          {categories
            .filter((category) => category.checked)
            .map((category) => category.name)
            .join(', ')}
        </p>
      </div>
    </div>
  )
}

export default Categories
