import { ReactElement, useEffect, useState } from 'react';
import { Food, IFood } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import api from '../../services/api';
import { FoodsContainer } from './styles';

export const Dashboard = (): ReactElement => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [editingFood, setEditingFood] = useState<IFood>()
  const [foods, setFoods] = useState<IFood[]>()

  const handleAddFood = async (food: IFood) => {
    try {
      const { data } = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods!, data])
    } catch (err) {
      console.log(err);
    }
  }


  const handleUpdateFood = async (food: IFood) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods?.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );
      setFoods(foodsUpdated)

    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods?.filter((food: any) => food.id !== id);
    setFoods(foodsFiltered)
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
  }

  const handleEditFood = (food: any) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  useEffect(() => {
    const asyncEffect = async () => {
      const { data } = await api.get('/foods')

      setFoods(data)
    }
    asyncEffect()
  }, [])
  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}