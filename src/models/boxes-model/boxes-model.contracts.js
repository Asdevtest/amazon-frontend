// import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber, // ValidateNested,
  IsOptional, // IsPositive,
  IsPositive,
  IsString,
} from 'class-validator'

export class BoxesCreateBoxContract {
  @IsOptional()
  @IsNumber()
  lengthCmSupplier

  @IsOptional()
  @IsNumber()
  widthCmSupplier

  @IsOptional()
  @IsNumber()
  heightCmSupplier

  @IsOptional()
  @IsNumber()
  weighGrossKgSupplier

  @IsOptional()
  @IsNumber()
  volumeWeightKgSupplier

  @IsOptional()
  @IsNumber()
  weightFinalAccountingKgSupplier

  @IsArray() items

  @IsOptional()
  @IsInt()
  amount
}

export class BoxesUpdateBoxContract {
  @IsNotEmpty()
  @IsString()
  clientId

  @IsNotEmpty()
  @IsInt()
  deliveryMethod

  @IsArray() items

  @IsOptional()
  @IsNumber()
  lengthCmWarehouse

  @IsOptional()
  @IsNumber()
  widthCmWarehouse

  @IsOptional()
  @IsNumber()
  heightCmWarehouse

  @IsOptional()
  @IsNumber()
  weighGrossKgWarehouse

  @IsOptional()
  @IsNumber()
  volumeWeightKgWarehouse

  @IsOptional()
  @IsNumber()
  weightFinalAccountingKgWarehouse
}

export class BoxesWarehouseUpdateBoxInTaskContract {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  lengthCmWarehouse

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  widthCmWarehouse

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  heightCmWarehouse

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  weighGrossKgWarehouse

  @IsOptional()
  @IsBoolean()
  isShippingLabelAttachedByStorekeeper
}

// export class BoxesWarehouseUpdateBoxInReceiveTaskContract {
//   @IsNotEmpty()
//   @IsNumber()
//   lengthCmWarehouse

//   @IsNotEmpty()
//   @IsNumber()
//   widthCmWarehouse

//   @IsNotEmpty()
//   @IsNumber()
//   heightCmWarehouse

//   @IsNotEmpty()
//   @IsNumber()
//   weighGrossKgWarehouse

//   @IsOptional()
//   @IsBoolean()
//   isShippingLabelAttachedByStorekeeper
// }

// export class BoxesWarehouseUpdateBoxInTaskSplitMergeEditContract {
//   @IsNotEmpty()
//   // @IsNumber()
//   @IsPositive()
//   deliveryLength

//   @IsNotEmpty()
//   // @IsNumber()
//   @IsPositive()
//   deliveryWidth

//   @IsNotEmpty()
//   // @IsNumber()
//   @IsPositive()
//   deliveryHeight

//   @IsNotEmpty()
//   // @IsNumber()
//   @IsPositive()
//   deliveryMass

//   @IsOptional()
//   @IsBoolean()
//   isShippingLabelAttachedByStorekeeper
// }

export class BoxesWarehouseReceiveBoxModalContract {
  @IsNotEmpty()
  @IsNumber()
  lengthCmWarehouse

  @IsNotEmpty()
  @IsNumber()
  widthCmWarehouse

  @IsNotEmpty()
  @IsNumber()
  heightCmWarehouse

  @IsNotEmpty()
  @IsNumber()
  weighGrossKgWarehouse

  @IsNotEmpty()
  @IsNumber()
  volumeWeightKgWarehouse

  @IsNotEmpty()
  @IsNumber()
  weightFinalAccountingKgWarehouse
}
