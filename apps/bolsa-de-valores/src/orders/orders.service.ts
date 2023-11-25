import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private readonly _order: typeof Order
    ){}

  async create(createOrderDto: CreateOrderDto) {
      const order = await this._order.create({
        ...createOrderDto,
        status: 'PENDING',
      });
      const save = await order.save();
       return save;
  }

  async findAll(account_id: string) {
    return await this._order.findAll({
      where: {
        account_id
      }
    });
  }

  async findOne(id: number) {
    return await this._order.findByPk(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const exist = await this._order.findOne({
      where: {
          id
      }
    });
    const save = await exist.update(updateOrderDto, {
      where: {
        id
      }
    });

    return save;
  }

  async remove(id: number) {
    const order =  await this._order.findByPk(id);
  
      await order.destroy();

      const exist =  await this._order.findByPk(id);

      return exist ? false : true;
  }
}
