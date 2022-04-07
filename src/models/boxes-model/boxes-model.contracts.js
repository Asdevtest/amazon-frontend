// import { Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsArray, // ValidateNested,
  IsOptional,
  IsNumber,
  IsBoolean,
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

  @IsNotEmpty()
  @IsString()
  clientId

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

  @IsOptional()
  @IsBoolean()
  isShippingLabelAttachedByStorekeeper
}

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
