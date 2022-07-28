import {makeAutoObservable, runInAction} from 'mobx'

// import {loadingStatuses} from '@constants/loading-statuses'
// import {ProductDataParser} from '@constants/product-data-parser'
// import {TranslationKey} from '@constants/translations/translation-key'
// import {ClientModel} from '@models/client-model'
// import {ProductModel} from '@models/product-model'
// import {ShopModel} from '@models/shop-model'
// import {StorekeeperModel} from '@models/storekeeper-model'
// import {SupplierModel} from '@models/supplier-model'
// import {UserModel} from '@models/user-model'
// import {updateProductAutoCalculatedFields} from '@utils/calculation'
// import {
//   checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
//   checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot,
// } from '@utils/checks'
// import {addIdDataConverter} from '@utils/data-grid-data-converters'
// import {t} from '@utils/translations'

export class ClientShopViewModel {
  history = undefined
  shopInfo = {}
  drawerOpen = false

  constructor({history}) {
    this.history = history

    makeAutoObservable(this, undefined, {autoBind: true})
  }
  async loadData() {
    try {
      await this.getShopInfoById()
    } catch (error) {
      console.log(error)
    }
  }

  async getShopInfoById() {
    try {
      // const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.VACANT)
      runInAction(() => {
        this.shopInfo = {
          images: [
            'https://amazonapi.fvds.ru/uploads/0b00679a-f734-4b3a-ae5c-e1f7193aaa0f.102510_O.gif',
            'https://amazonapi.fvds.ru/uploads/21dad3dc-4d37-4a75-a69e-9e8f5a0a9f37.____-___4x.webp',
            'https://amazonapi.fvds.ru/uploads/75656336-406a-4bc3-9cc2-67b49b130936.102510_O.gif',
          ],
          title: 'Магазин столовых принадлежностей',
          pricePeriod: 12,
          multiplier: 47,
          cost: 5000,
          shopLink: 'https://aliexpress.ru/',
          createBusinesData: '10 июля 2010 г.',
          profitForTheReportingPeriod: [
            {
              name: 'январь 2031',
              uv: 4000,
              pv: 2400,
              amt: 2400,
            },
            {
              name: 'февраль 2031',
              uv: 3000,
              pv: 1398,
              amt: 2210,
            },
            {
              name: 'март 2031',
              uv: 2000,
              pv: 9800,
              amt: 2290,
            },
            {
              name: 'апрель 2031',
              uv: 2780,
              pv: 3908,
              amt: 2000,
            },
            {
              name: 'май 2031',
              uv: 1890,
              pv: 4800,
              amt: 2181,
            },
            {
              name: 'июнь 2031',
              uv: 2390,
              pv: 3800,
              amt: 2500,
            },
          ],
          trafficForTheReportingPeriod: [
            {
              name: 'январь 2031',
              uv: 1000,
              pv: 400,
              amt: 2400,
            },
            {
              name: 'февраль 2031',
              uv: 1200,
              pv: 298,
              amt: 2210,
            },
            {
              name: 'март 2031',
              uv: 2000,
              pv: 870,
              amt: 2290,
            },
            {
              name: 'апрель 2031',
              uv: 2780,
              pv: 908,
              amt: 2000,
            },
            {
              name: 'май 2031',
              uv: 1890,
              pv: 500,
              amt: 2181,
            },
            {
              name: 'июнь 2031',
              uv: 2390,
              pv: 1130,
              amt: 2500,
            },
          ],
          asset: [
            'Один домен перенаправления',
            'Дополнительный домен и весь контент/файлы сайта',
            'Аккаунты/страницы в социальных сетях (18 аккаунтов/страниц для Facebook, Twitter, Instagram, Pinterest, TikTok, Youtube, LinkedIn, PUBLC и Mewe)',
            'Два списка адресов электронной почты (78 000+ подписчиков)',
            'Пять фирменных электронных книг',
            'Товарные знаки',
          ],
          features: [
            'Диверсификация потоков доходов за счет публикации электронных книг, цифровых продуктов и физических продуктов.',
            'Развитие каналов Youtube и TikTok',
            'Повышение стоимости платной подписки за счет добавления дополнительных ресурсов для премиум-членов.',
          ],
          risks: [
            'Алгоритмические изменения Google могут привести к колебаниям трафика.',
            'Изменения рекламодателя могут повлиять на прибыль за клик (EPC) в вашем рекламном аккаунте.',
          ],
          workAndSkills: [
            'Добавление изображений и контента в сообщения',
            'Просмотр письменного контента, написанного писателями',
            'Еженедельное электронное письмо',
            'Проведение SEO-исследований',
            'Проверка статистики сайта, чтобы определить, нужны ли изменения стратегии',
          ],
          sellerSupport: [
            'Продавец готов предложить 3 месяца поддержки по электронной почте и телефону, чтобы обеспечить плавный переход для Покупателя. Это в три раза больше поддержки, чем обычно предлагают продавцы.',
          ],
          reasonsForSale: ['Продавец хотел бы изучить другие возможности.'],
          additionalInformation: [
            'Требуемая работа в неделю: 20 часов',
            'Сеть частных блогов (PBN): Нет',
            'Типы доменов: .com',
            'Платформы: WordPress',
            'Страны : США, Канада, Великобритания',
          ],
          description:
            'Этот список предназначен для медийной рекламы и партнерского бизнеса, созданного в июле 2010 года в нише продуктов питания и напитков. Бизнес состоит из двух сайтов WordPress, на которых размещен информационный контент, рецепты и руководства по покупке, связанные с темами кулинарии и образа жизни. Один из сайтов устарел и рано вошел в популярную нишу, а у брендов более 3,7 млн ​​подписчиков в социальных сетях. Сайты привлекают значительный трафик из нескольких источников и росли из года в год за последние 6 месяцев.',
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
