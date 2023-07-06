/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react'

import { SelectChangeEvent } from '@mui/material/Select/SelectInput'

import { AdministratorModel } from '@models/administrator-model'

import { updateObjPropsWithArr } from '@components/product/management/update-obj-props-with-arr.helper'

import { UserRolesForAdminProductBindingChange } from '@constants/keys/user-roles'

import { DataType, MemberType, MembersType, IPromiseItem, Members } from './management.types'
import { ProductModel } from '@models/product-model'

export const useManagement = () => {
  const [members, setMembers] = useState<MembersType>({
    buyers: [],
    clients: [],
    researchers: [],
    supervisors: [],
  })
  const [client, setClient] = useState<MemberType>({ _id: '', name: '' })
  const [buyer, setBuyer] = useState<MemberType>({ _id: '', name: '' })
  const [supervisor, setSupervisor] = useState<MemberType>({ _id: '', name: '' })
  const [researcher, setResearcher] = useState<MemberType>({ _id: '', name: '' })
  const [productId, setProductId] = useState<string | null>('')
  const [product, setProduct] = useState<any>({})
  const [data, setData] = useState<DataType>({
    productId: '',
    buyerId: '',
    supervisorId: '',
    clientId: '',
  })
  const [isDisabledClient, setIsDisabledClient] = useState(true)
  const [isDisabledBuyer, setIsDisabledBuyer] = useState(true)
  const [isDisabledSupervisor, setIsDisabledSupervisor] = useState(true)
  const [isDisabledResearcher, setIsDisabledResearcher] = useState(true)

  const handleGetProduct = async (id: string) => {
    const result = await ProductModel.getProductById(id)

    setProduct(result)
  }

  const handleUpdateMember = async () => {
    await AdministratorModel.bindOrUnbindUserToProduct(data)

    if (productId) {
      await handleGetProduct(productId)
    }
  }

  useEffect(() => {
    const url = new URL(window.location.href)

    if (url) {
      setProductId(url.searchParams.get('product-id'))
    }

    const promises: Promise<IPromiseItem>[] = UserRolesForAdminProductBindingChange.map(roleCode =>
      AdministratorModel.getUsersByRole(roleCode),
    )
    const handleGetMembers = async () => {
      const resultArray: PromiseSettledResult<IPromiseItem>[] = await Promise.allSettled(promises)

      setMembers(updateObjPropsWithArr(members, resultArray))
    }
    handleGetMembers()
  }, [])

  useEffect(() => {
    if (productId) {
      handleGetProduct(productId)
    }
  }, [productId])

  useEffect(() => {
    if (members.clients?.length > 0) {
      const defaultClient = members.clients.find(member => member._id === product?.client?._id)

      if (defaultClient) {
        setClient(defaultClient)
      }
    }
  }, [members.clients, product?.client?._id])

  useEffect(() => {
    if (members.buyers?.length > 0) {
      const defaultBuyer = members.buyers.find(member => member._id === product?.buyer?._id)

      if (defaultBuyer) {
        setBuyer(defaultBuyer)
      }
    }
  }, [members.buyers, product?.buyer?._id])

  useEffect(() => {
    if (members.supervisors?.length > 0) {
      const defaultSupervisor = members.supervisors.find(member => member._id === product?.checkedBy?._id)

      if (defaultSupervisor) {
        setSupervisor(defaultSupervisor)
      }
    }
  }, [members.supervisors, product?.checkedBy?._id])

  useEffect(() => {
    if (members.researchers?.length > 0) {
      const defaultResearcher = members.researchers.find(member => member._id === product?.createdBy?._id)

      if (defaultResearcher) {
        setResearcher(defaultResearcher)
      }
    }
  }, [members.researchers, product?.createdBy?._id])

  useEffect(() => {
    setIsDisabledClient(client._id === (product?.client?._id ?? ''))
  }, [client, product?.client?._id])

  useEffect(() => {
    setIsDisabledBuyer(buyer._id === (product?.buyer?._id ?? ''))
  }, [buyer, product?.buyer?._id])

  useEffect(() => {
    setIsDisabledSupervisor(supervisor._id === (product?.checkedBy?._id ?? ''))
  }, [supervisor, product?.checkedBy?._id])

  useEffect(() => {
    const foundResearcher = members.researchers?.find(member => member._id === product?.createdBy?._id)

    if (foundResearcher) {
      setIsDisabledResearcher(researcher._id === (product?.createdBy?._id ?? ''))
    } else {
      setIsDisabledResearcher(true)
    }
  }, [researcher, product?.createdBy?._id])

  useEffect(() => {
    setData({
      productId: product._id,
      buyerId: buyer._id,
      supervisorId: supervisor._id,
      clientId: client._id,
    })
  }, [product._id, buyer._id, supervisor._id, client._id])

  const handleMemberChange = (event: SelectChangeEvent<string>, memberType: number) => {
    const selectedMemberId = event.target.value

    let selectedMember = null

    switch (memberType) {
      case Members.Client:
        selectedMember = members.clients.find(member => member._id === selectedMemberId)
        setClient(selectedMember || { _id: '', name: '' })
        break
      case Members.Buyer:
        selectedMember = members.buyers.find(member => member._id === selectedMemberId)
        setBuyer(selectedMember || { _id: '', name: '' })
        break
      case Members.Supervisor:
        selectedMember = members.supervisors.find(member => member._id === selectedMemberId)
        setSupervisor(selectedMember || { _id: '', name: '' })
        break
      case Members.Researcher:
        selectedMember = members.researchers.find(member => member._id === selectedMemberId)
        setResearcher(selectedMember || { _id: '', name: '' })
        break
      default:
        break
    }
  }

  const handleChangeClient = (event: SelectChangeEvent<string>) => {
    handleMemberChange(event, Members.Client)
  }

  const handleChangeBuyer = (event: SelectChangeEvent<string>) => {
    handleMemberChange(event, Members.Buyer)
  }

  const handleChangeSupervisor = (event: SelectChangeEvent<string>) => {
    handleMemberChange(event, Members.Supervisor)
  }

  const handleChangeResearcher = (event: SelectChangeEvent<string>) => {
    handleMemberChange(event, Members.Researcher)
  }

  const isEditableClient = product.status === 200 || product.status === 275
  const isEditableBuyer = product.status <= 200 || product.status === 275
  const isEditableSupervisor = true
  const isEditableResearcher = product.status < 200

  return {
    client,
    clients: members.clients,
    buyer,
    buyers: members.buyers,
    supervisor,
    supervisors: members.supervisors,
    researcher,
    researchers: members.researchers,
    isDisabledClient,
    isDisabledBuyer,
    isDisabledSupervisor,
    isDisabledResearcher,
    isEditableClient,
    isEditableBuyer,
    isEditableSupervisor,
    isEditableResearcher,
    onChangeClient: handleChangeClient,
    onChangeBuyer: handleChangeBuyer,
    onChangeSupervisor: handleChangeSupervisor,
    onChangeResearcher: handleChangeResearcher,
    onUpdateMember: handleUpdateMember,
  }
}
