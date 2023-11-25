import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Metadata } from '@grpc/grpc-js';
import { Observable, lastValueFrom } from 'rxjs';

type Order = {
  order_id: number;
  account_id: string;
  asset_id: string;
  quantity: number;
  status: string;
};

interface OrderGrpcClient {
  createOrder(
    data: {
      account_id: string;
      asset_id: string;
      quantity: number;
    },
    metadata?: Metadata,
  ): Observable<{ order: Order }>;

  findAllOrders(
    data: { account_id: string },
    metadata?: Metadata,
  ): Observable<{ orders: Order[] }>;

  findOneOrder(
    data: { order_id: number },
    metadata?: Metadata,
  ): Observable<{ order: Order }>;

  updateOrder(data: { 
    order_id?: number, 
    account_id?: string;
    asset_id?: string;
    quantity?: number;
    status?: string;
  },
    metadata?: Metadata,
  ): Observable<{ order: Order }>;

  deleteOrder(data: { 
    order_id: number
  },
    metadata?: Metadata,
  ): Observable<{ delete: boolean }>;
}

@Injectable()
export class OrdersService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'ordersproto',
      protoPath: [join(__dirname, 'orders', 'proto', 'orders.proto')],
      loader: { keepCase: true },
    },
  })
  clientGrpc: ClientGrpc;

  private orderGrpcClient: OrderGrpcClient;

  onModuleInit() {
    this.orderGrpcClient = this.clientGrpc.getService('OrderService');
  }

  async create(createOrderDto: CreateOrderDto) {
    const metadata = new Metadata();
    metadata.set('authorization', 'Bearer seuToken');
    const result = await lastValueFrom(
      this.orderGrpcClient.createOrder(createOrderDto, metadata),
    );
    return result.order;
  }

  async findAll(account_id: string) {
    const metadata = new Metadata();
    metadata.set('authorization', 'Bearer seuToken');
    const result = await lastValueFrom(
      this.orderGrpcClient.findAllOrders({ account_id }, metadata),
    );
    return result.orders;
  }

  async findOne(id: number) {
    const metadata = new Metadata();
    metadata.set('authorization', 'Bearer seuToken');
    const result = await lastValueFrom(
      this.orderGrpcClient.findOneOrder({ order_id: id }, metadata),
    );
    return result.order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const metadata = new Metadata();
    metadata.set('authorization', 'Bearer seuToken');
    updateOrderDto.order_id = id;
    const result = await lastValueFrom(
      this.orderGrpcClient.updateOrder(updateOrderDto, metadata),
    );
    return result.order;
  }

  async remove(id: number) {
    const metadata = new Metadata();
    metadata.set('authorization', 'Bearer seuToken');
    const result = await lastValueFrom(
      this.orderGrpcClient.deleteOrder({ order_id: id}, metadata),
    );
    return result;
  }
}
