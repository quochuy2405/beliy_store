<script setup lang="ts">
import { VCartItem } from '@/components/molecules'
import { useCart, useToast } from '@/stores/nuxtStore'
import { storeToRefs } from 'pinia'
import shortid from 'shortid'
import { VModal } from '.'

// variables
const tabs = [
    {
        label: 'Trang chủ',
        router: '/',
        name: 'index',
    },
    {
        label: 'Sản phẩm',
        router: '/products',
        name: 'products',
    },
    {
        label: 'Dành cho nữ',
        router: '/forwoman',
        name: 'forwoman',
    },
    {
        label: 'Dành cho nam',
        router: '/formen',
        name: 'formen',
    },
    {
        label: 'Giới thiệu',
        router: '/info',
        name: 'info',
    },
]

const scrollPosition = ref(0)
const modelType = ref<'note' | 'discount' | null>(null)
const router = useRouter()
const checkoutId = useCookie('checkoutId')
const dataOrder = useCookie<{ discount: string; note: string }>('dataOrder', {
    default: () => ({
        discount: '',
        note: '',
    }),
    watch: true,
})
const dataForm = ref({
    discount: '',
    note: '',
})
const modalOpen = useState('modalControl')
const { products } = storeToRefs(useCart())
const { isShow, status, content } = storeToRefs(useToast())
const classTopHeader = computed(() => ({
    'fade-bottom fixed w-full top-0': !!scrollPosition.value,
    'block relative': !scrollPosition.value,
}))
// functions

const handleShowToast = ({
    contentVal,
    type = 'warning',
}: {
    contentVal: string
    type?: 'info' | 'success' | 'error' | 'warning'
}) => {
    isShow.value = true
    status.value = type
    content.value = contentVal
}

const gotoProductPage = (path: string) => {
    router.push({ path })
}

const saveForm = (type: 'note' | 'discount' | null) => {
    if (!type) return

    dataOrder.value = { ...dataForm.value }

    switch (type) {
        case 'note': {
            if (!dataForm.value.note) {
                handleShowToast({ contentVal: 'Hãy nhập gì đó!' })
                dataOrder.value.note = ''
            } else {
                modelType.value = null
                modalOpen.value = false
            }

            break
        }

        case 'discount': {
            if (!dataForm.value.discount) {
                handleShowToast({ contentVal: 'Bạn cần nhập mã' })
            } else {
                // if (true) {
                handleShowToast({
                    contentVal: 'Mã không hợp lệ!',
                    type: 'error',
                })
                dataForm.value.discount = ''
                // } else {
                //     modelType.value = null
                //     modalOpen.value = false
                // }
            }

            break
        }
        default:
            break
    }
}

const handleModal = (type: 'note' | 'discount' | null) => {
    modelType.value = type
    modalOpen.value = true
}

const gotoCheckout = () => {
    const id = shortid.generate()
    checkoutId.value = id
    router.push({ path: `/checkout/` })
}

onMounted(() => {
    const body = document.querySelector('body')

    // products.value = cartProducts
    body.addEventListener('scroll', () => {
        setTimeout(() => {
            scrollPosition.value = body.scrollTop
        }, 200)
    })

    const cartProducts =
        !!window.localStorage.getItem('cartProducts') &&
        window.localStorage.getItem('cartProducts') !== 'null'
            ? JSON.parse(window.localStorage.getItem('cartProducts'))
            : null

    if (!!cartProducts) {
        products.value = cartProducts._object.products
    }
})
watch(
    () => JSON.stringify(products.value),
    () => {
        const _cartProducts: any = JSON.stringify(products, null, 2)
        window.localStorage.setItem('cartProducts', _cartProducts)
    },
)
</script>
<template>
    <div class="h-16">
        <header class="shadow-sm z-[30] bg-white" :class="classTopHeader">
            <input id="hamburger" type="checkbox" class="hidden" checked />
            <div
                class="w-full h-9 bg-black px-6 hidden lg:flex lg:items-center text-white font-did"
            >
                <div class="flex gap-4 text-sm flex-1">
                    <a href="tel:+84963639201">+84 963639201</a>
                    <a href="mailto:beliystore0604@gmail.com"
                        >beliystore0604@gmail.com</a
                    >
                </div>
                <p class="flex-[2] text-center">
                    Sign up for 10% off your first order
                </p>
                <div class="flex-1"></div>
            </div>
            <div
                class="w-full h-16 flex items-center px-6 justify-between lg:px-24"
            >
                <NuxtLink
                    href="https://www.facebook.com/beliystores"
                    class="lg:hidden"
                    target="_blank"
                >
                    <ClientOnly>
                        <Icon
                            name="logos:facebook"
                            class="h-6 w-6 font-semibold"
                        /> </ClientOnly
                ></NuxtLink>

                <NuxtLink href="/" class="w-16 h-10">
                    <img src="@/assets/svg/logo.svg" alt="beliy logo" />
                </NuxtLink>
                <div class="hidden lg:flex lg:gap-8">
                    <NuxtLink
                        v-for="tab in tabs"
                        :key="tab.router + tab.label"
                        :to="tab.router"
                    >
                        <p
                            class="font-medium text-sm"
                            :class="{
                                'font-semibold':
                                    router.currentRoute.value.name == tab.name,
                            }"
                        >
                            {{ tab.label }}
                        </p>
                    </NuxtLink>
                </div>
                <button
                    :class="{
                        'pointer-events-none':
                            router.currentRoute.value.name === 'checkout',
                    }"
                    :disabled="router.currentRoute.value.name === 'checkout'"
                >
                    <label
                        for="hamburger"
                        :class="{
                            'pointer-events-none':
                                router.currentRoute.value.name === 'checkout',
                        }"
                    >
                        <div class="w-fit h-fit relative">
                            <span
                                class="bg-red-600 text-[9px] font-semibold text-white w-4 h-4 absolute flex items-center justify-center rounded-full -right-1/3 font-did"
                                >{{ products.length || 0 }}</span
                            >
                            <ClientOnly>
                                <Icon
                                    name="iconoir:simple-cart"
                                    class="h-6 w-6 cursor-pointer"
                                />
                            </ClientOnly></div
                    ></label>
                </button>
            </div>
            <label
                for="hamburger"
                id="bar-overlay"
                class="bg-gray-100 opacity-30 fixed top-0 h-screen w-screen bottom-0 cursor-pointer"
            >
                ></label
            >

            <aside
                id="bar-mobile"
                class="!z-50 h-screen w-screen fixed top-0 left-0 md:w-[70%] lg:w-[40%] flex-shrink-0 overflow-hidden bg-white md:block shadow-lg pt-10"
                :class="{
                    '!hidden': router.currentRoute.value.name === 'checkout',
                }"
            >
                <h1 class="font-medium text-lg uppercase px-4 text-black">
                    Giỏ hàng của bạn
                </h1>
                <label
                    for="hamburger"
                    class="absolute top-3 right-3 cursor-pointer hover:text-red-400"
                >
                    <ClientOnly
                        ><Icon
                            name="material-symbols:close-rounded"
                            class="w-6 h-6"
                    /></ClientOnly>
                </label>
                <div
                    class="text-gray-500 h-full flex flex-col flex-1 w-full relative"
                >
                    <div
                        v-if="products.length"
                        class="flex-1 h-full flex flex-col"
                    >
                        <div class="flex-1 overflow-y-auto">
                            <VCartItem v-for="item in products" :data="item" />
                        </div>
                        <div class="h-fit flex flex-col bottom-0 pb-24">
                            <div class="flex justify-evenly h-14 border">
                                <ClientOnly>
                                    <div
                                        class="flex flex-col items-center justify-center cursor-pointer"
                                        @click="handleModal('note')"
                                    >
                                        <p class="text-xs">Ghi chú</p>
                                        <Icon
                                            name="solar:notes-broken"
                                            class="w-6 h-6 text-black hover:text-gray-500"
                                        />
                                    </div>
                                </ClientOnly>
                                <ClientOnly>
                                    <div
                                        class="flex flex-col items-center justify-center cursor-pointer"
                                        @click="handleModal('discount')"
                                    >
                                        <p class="text-xs">Mã giảm giá</p>
                                        <Icon
                                            name="iconamoon:discount-light"
                                            class="w-6 h-6 text-black hover:text-gray-500"
                                        />
                                    </div>
                                </ClientOnly>
                            </div>
                            <div class="flex-1 p-5">
                                <div
                                    class="flex justify-between text-lg text-black font-medium"
                                >
                                    <h2 class="uppercase">Tạm tính</h2>
                                    <p class="text-green-500">
                                        {{
                                            Number(
                                                products.reduce(
                                                    (total, item) => {
                                                        return (
                                                            total +
                                                            item.price *
                                                                1000 *
                                                                item.quantityOrder
                                                        )
                                                    },
                                                    0,
                                                ),
                                            ).toLocaleString()
                                        }}
                                        đ
                                    </p>
                                </div>
                                <div class="flex flex-col mt-5 gap-2">
                                    <label for="hamburger">
                                        <div
                                            @click="gotoCheckout"
                                            class="button-default bg-green-500"
                                        >
                                            <span
                                                class="button-wait-tap"
                                            ></span>
                                            <p>THANH TOÁN</p>
                                        </div>
                                    </label>
                                    <label for="hamburger">
                                        <div
                                            @click="
                                                gotoProductPage('/products')
                                            "
                                            class="button-default"
                                        >
                                            <span
                                                class="button-wait-tap"
                                            ></span>
                                            <p>Tiếp tục mua hàng</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <VModal>
                            <div
                                v-if="modelType === 'note'"
                                class="py-5 w-full"
                            >
                                <textarea
                                    type="text"
                                    class="input-default rounded-lg"
                                    placeholder="Ghi chú của bạn"
                                    rows="4"
                                    :value="(dataForm && dataForm.note) || ''"
                                    @input="
                                        (event) =>
                                            (dataForm.note = (
                                                event.target as HTMLTextAreaElement
                                            ).value)
                                    "
                                ></textarea>
                                <div
                                    class="button-default mt-5"
                                    @click="saveForm('note')"
                                >
                                    <span class="button-wait-tap"></span>
                                    <p>Lưu ghi chú</p>
                                </div>
                            </div>
                            <div
                                v-if="modelType === 'discount'"
                                class="py-5 w-full"
                            >
                                <input
                                    type="text"
                                    class="input-default rounded-full"
                                    placeholder="Mã giảm giá"
                                    :value="
                                        (dataForm && dataForm.discount) || ''
                                    "
                                    @input="
                                        (event) =>
                                            (dataForm.note = (
                                                event.target as HTMLInputElement
                                            ).value)
                                    "
                                />
                                <div
                                    class="button-default mt-5"
                                    @click="saveForm('discount')"
                                >
                                    <span class="button-wait-tap"></span>
                                    <p>Áp dụng</p>
                                </div>
                            </div>
                        </VModal>
                    </div>

                    <div
                        v-if="!products.length"
                        class="flex items-center flex-col gap-3 mt-[20%]"
                    >
                        <ClientOnly>
                            <Icon
                                name="solar:bag-5-broken"
                                class="w-20 h-20 text-gray-200"
                            />
                        </ClientOnly>
                        <div class="flex items-center flex-col gap-2">
                            <h2 class="text-xl font-normal">Giỏ hàng rỗng</h2>
                            <p class="text-sm w-2/3 m-auto text-center">
                                Bạn có thể xem tất cả sản phẩm và mua nó ở trang
                                shop
                            </p>
                        </div>
                        <label for="hamburger">
                            <div
                                @click="gotoProductPage('/products')"
                                class="button-default mt-5 cursor-pointer"
                            >
                                <span class="button-wait-tap"></span>
                                <p>Đi đến cửa hàng</p>
                            </div>
                        </label>
                    </div>
                </div>
            </aside>
        </header>
        <div class="fixed h-fit bottom-0 w-full z-[29] lg:hidden">
            <div
                class="w-5/6 m-auto h-12 bg-white shadow-md rounded-full z-30 flex justify-evenly items-center"
            >
                <ClientOnly>
                    <NuxtLink href="/" class="flex flex-col items-center">
                        <Icon name="solar:home-2-broken" class="w-5 h-5" />
                        <p class="text-xs font-medium">Home</p>
                    </NuxtLink>
                    <NuxtLink
                        href="/products"
                        class="flex flex-col items-center"
                    >
                        <Icon name="solar:shop-broken" class="w-5 h-5" />
                        <p
                            class="text-xs font-medium"
                            :class="{
                                'font-semibold':
                                    router.currentRoute.value.name ==
                                    'products',
                            }"
                        >
                            Shop
                        </p>
                    </NuxtLink>
                    <NuxtLink href="/formen" class="flex flex-col items-center">
                        <Icon name="solar:men-broken" class="w-5 h-5" />
                        <p
                            class="text-xs font-medium"
                            :class="{
                                'font-semibold':
                                    router.currentRoute.value.name == 'formen',
                            }"
                        >
                            Men
                        </p>
                    </NuxtLink>
                    <NuxtLink
                        href="/forwoman"
                        class="flex flex-col items-center"
                    >
                        <Icon name="solar:women-broken" class="w-5 h-5" />
                        <p
                            class="text-xs font-medium"
                            :class="{
                                'font-semibold':
                                    router.currentRoute.value.name ==
                                    'forwoman',
                            }"
                        >
                            Woman
                        </p>
                    </NuxtLink>
                    <NuxtLink href="/info" class="flex flex-col items-center">
                        <Icon name="solar:info-square-broken" class="w-5 h-5" />
                        <p
                            class="text-xs font-medium"
                            :class="{
                                'font-semibold':
                                    router.currentRoute.value.name == 'info',
                            }"
                        >
                            Info
                        </p>
                    </NuxtLink>
                </ClientOnly>
            </div>
            <div
                class="h-5 w-5/6 m-auto bg-white rounded-tr-full rounded-tl-full mt-5"
            ></div>
        </div>
    </div>
</template>
