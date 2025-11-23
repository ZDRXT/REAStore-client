import "./AddToBasketBtn.scss"

import { ShoppingCart, Check } from "lucide-react"

import useBasketStore from "@/store/useBasketStore"

const AddToBasketBtn = ({ type = "small", productId }) => {
    const { addToBasket } = useBasketStore()

    if (!productId) return null

    const handleAddToBasket = () => {
        addToBasket(productId)
    }

    return (
        <button className={`AddToBasketBtn ${type}-btn`} onClick={handleAddToBasket}>
            <ShoppingCart size={24} />
            {type === "small" ? "" : <span>До кошика</span>}
        </button>
    )
}

export default AddToBasketBtn