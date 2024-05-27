'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'

import { Textarea } from '@/components/ui/Textarea'
import { productPayload, productSchema } from '@/lib/validators/product'

import { FileUpload } from './FileUpload'
import prisma from '@/lib/db'

export function AddProductForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const params = useParams()
  const router = useRouter()

  const form = useForm<productPayload>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })
  const { watch } = form;
  const formValues = watch();

  const onSubmit = async (values: productPayload) => {

    try {
      setIsLoading(true)
      const elementIDndPrice: string[] = values.elementId.split("@");
      const price = Number(elementIDndPrice[1]);
      const elementId = elementIDndPrice[0];
      // if (values.elementId == "artificial@0" && values?.price && values?.discount) {
      //   // xPercentageMetalAmount = purity 
      //   values.weightInGrams = 0;
      //   values.xPercentageMetalAmount = 0;
      //   values.price = values?.price * 1 - values?.discount
      //   values.elementId = elementId
      //   const { data }: { data: Product } = await axios.post(
      //     `/api/stores/${params.storeId}/products`,
      //     values,
      //   )
      //   router.push(`/${data.storeId}/${data.slug}?productId=${data.id}`)

      // }
      if (values.weightInGrams && values.xPercentageMetalAmount && values.discount) {
        const xPercent = values.xPercentageMetalAmount / 100

        values.metalAmount = values.weightInGrams * price;

        values.makingCharges = values.metalAmount * xPercent;

        const discount = (values.discount / 100) * values.makingCharges  //for  10  0.1


        values.elementId = elementId

        values.productPrice = values.metalAmount + values.makingCharges -discount

        values.gst = 3 / 100 * values.productPrice

        values.price = values.productPrice + values.gst
        console.log("🚀 ~ onSubmit ~ values:", values)
        const { data }: { data: Product } = await axios.post(
          `/api/stores/${params.storeId}/products`,
          values,
        )
        router.push(`/${data.storeId}/${data.slug}?productId=${data.id}`)
      }
      toast.success('Product is created.')
    } catch (error: any) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      toast.error(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }
  const [Elements, setElements] = useState<any | null>(null);
  useEffect(() => {
    const fetchElements = async () => {
      const response = await axios.get("/api/elements");
      if (response) {
        setElements(response.data);
      }
    }
    fetchElements()
  }, [])
  return (
    <Form {...form}>
      <form
        className='grid w-full max-w-xl gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Type product name here.'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Type product description here.'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col items-start gap-6 sm:flex-row'>
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem className='flex-1 w-full'>
                <FormLabel>Category</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='necklaces'>Necklaces</SelectItem>
                    <SelectItem value='earrings'>Earrings</SelectItem>
                    <SelectItem value='rings'>Rings</SelectItem>
                    <SelectItem value='bracelets'>Bracelets</SelectItem>
                    <SelectItem value='anklets'>Anklets</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {Elements && <FormField
            control={form.control}
            name='elementId'
            render={({ field }) => (
              <FormItem className='flex-1 w-full'>
                <FormLabel>Element</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Elements.map((ele: any) => {
                      return (<SelectItem value={`${`${ele.id}@${ele.price}`}`} key={ele.id}>{ele.name}</SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />}
        </div>

        {formValues?.elementId == "artificial@0" ? null : <div className='flex flex-col items-start gap-6 sm:flex-row'>

          <FormField
            control={form.control}
            name='weightInGrams'
            render={({ field }) => (
              <FormItem className='flex-1 w-full'>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center'>
                      gm
                    </p>
                    <Input
                      type='number'
                      className='pl-8'
                      placeholder='0'
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='xPercentageMetalAmount'
            render={({ field }) => (
              <FormItem className='flex-1 w-full'>
                <FormLabel>X % M Amount</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center'>
                      %
                    </p>
                    <Input
                      type='number'
                      className='pl-8'
                      placeholder='0'
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        }
        <FormField
          control={form.control}
          name='discount'
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <div className='relative'>
                  <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center'>
                    %
                  </p>
                  <Input
                    type='number'
                    className='pl-8'
                    placeholder='0'
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='stock'
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type='number'
                    className='pl-8'
                    placeholder='0'
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



        {formValues.elementId == 'artificial@0' ? <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <div className='relative'>
                  <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center'>
                    Rp
                  </p>
                  <Input
                    type='number'
                    className='pl-8'
                    placeholder='0'
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> : null}
        <FormField
          control={form.control}
          name='images'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <FileUpload
                  endpoint='imageUploader'
                  value={field.value}
                  onChange={(file) =>
                    field.value
                      ? field.onChange([...field.value, ...file])
                      : field.onChange([...file])
                  }
                  onRemove={(url) =>
                    field.onChange([
                      ...field.value.filter((current) => current.url !== url),
                    ])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isLoading}>
          Add Product
          <span className='sr-only'>Add Product</span>
        </Button>
      </form>
    </Form>
  )
}
