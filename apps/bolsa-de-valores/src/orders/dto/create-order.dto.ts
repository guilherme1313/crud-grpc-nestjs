import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateOrderDto {
 @IsString()
 @IsNotEmpty()
  account_id: string;

  @IsString()
  @IsNotEmpty()
  asset_id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
