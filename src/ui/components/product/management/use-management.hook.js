import { useEffect, useMemo, useState } from 'react'

import { AdministratorModel } from '@models/administrator-model'

const SWITCH_TO_CLIENT_STATUS = 200

export const useManagement = (allMembers, product) => {
  const [members, setMembers] = useState({})
  const [client, setClient] = useState({ _id: '', name: '' })
  const [buyer, setBuyer] = useState({ _id: '', name: '' })
  const [supervisor, setSupervisor] = useState({ _id: '', name: '' })
  const [researcher, setResearcher] = useState({ _id: '', name: '' })
  const [data, setData] = useState({
    productId: '',
    buyerId: '',
    supervisorId: '',
    clientId: '',
  })
  const [isDisabledClient, setIsDisabledClient] = useState(true)
  const [isDisabledBuyer, setIsDisabledBuyer] = useState(true)
  const [isDisabledSupervisor, setIsDisabledSupervisor] = useState(true)
  const [isDisabledResearcher, setIsDisabledResearcher] = useState(true)

  const isEditableMember = product.status >= SWITCH_TO_CLIENT_STATUS

  useEffect(() => {
    setMembers(allMembers)
  }, [allMembers])

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
    const foundResearcher = members.researchers?.find(({ id }) => id === product?.createdBy?._id)

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

  const handleChangeClient = event => {
    const selectedMemberId = event.target.value

    const selectedMember = members.clients.find(member => member._id === selectedMemberId)

    if (selectedMember) {
      setClient(selectedMember)
    } else {
      setClient({ _id: '', name: '' })
    }
  }

  const handleChangeBuyer = event => {
    const selectedMemberId = event.target.value

    const selectedMember = members.buyers.find(member => member._id === selectedMemberId)

    if (selectedMember) {
      setBuyer(selectedMember)
    } else {
      setBuyer({ _id: '', name: '' })
    }
  }

  const handleChangeSupervisor = event => {
    const selectedMemberId = event.target.value

    const selectedMember = members.supervisors.find(member => member._id === selectedMemberId)

    if (selectedMember) {
      setSupervisor(selectedMember)
    } else {
      setSupervisor({ _id: '', name: '' })
    }
  }

  const handleChangeResearcher = event => {
    const selectedMemberId = event.target.value

    const selectedMember = members.researchers.find(member => member._id === selectedMemberId)

    if (selectedMember) {
      setResearcher(selectedMember)
    } else {
      setResearcher({ _id: '', name: '' })
    }
  }

  const handleUpdateMember = async () => {
    await AdministratorModel.bindOrUnbindUserToProduct(data)
  }

  return useMemo(
    () => ({
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
      isEditableMember,
      onChangeClient: handleChangeClient,
      onChangeBuyer: handleChangeBuyer,
      onChangeSupervisor: handleChangeSupervisor,
      onChangeResearcher: handleChangeResearcher,
      onUpdateMember: handleUpdateMember,
    }),
    [allMembers, product, handleChangeClient, handleChangeBuyer, handleChangeSupervisor, handleChangeResearcher],
  )
}
