import { Injectable } from '@nestjs/common';
import { TaskStatus } from './tasks.enum';
import { TaskDto } from './dto/task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTask: TaskDto, user: User) {
    try {
      const task = new Task();

      const { title, description } = createTask;

      task.title = title;
      task.description = description;
      task.status = TaskStatus.OPEN;
      task.user = user;

      await this.taskRepository.save(task);
      return {
        statusCode: 201,
        message: 'Task created successfully',
        task,
      };
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(id: number, user) {
    try {
      const task = await this.taskRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.user', 'user')
        .where('task.id = :id', { id })
        .andWhere('user.id = :userId', { userId: user.id })
        .select([
          'task.id',
          'task.title',
          'task.description',
          'task.status',
          'task.created_at',
          'task.updated_at',
          'user.id',
          'user.name',
        ])
        .getOne();

      if (!task) {
        return {
          statusCode: 400,
          message: 'Task does not exist',
          task: [],
        };
      }
      return {
        statusCode: 200,
        message: 'Task retrieve successfully',
        task,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteTaskById(id: number, user) {
    try {
      const task = await this.taskRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.user', 'user')
        .where('task.id = :id', { id })
        .andWhere('user.id = :userId', { userId: user.id })
        .select([
          'task.id',
          'task.title',
          'task.description',
          'task.status',
          'task.created_at',
          'task.updated_at',
          'user.id',
          'user.name',
        ])
        .getOne();
      if (!task) {
        return {
          statusCode: 400,
          message: 'You do not have a task to delete',
        };
      }
      const deletedTask = await this.taskRepository.delete(task.id);
      return {
        statusCode: 200,
        message: 'Task deleted successfully',
        deletedTask,
      };
    } catch (error) {
      throw error;
    }
  }

  async allTasks(user) {
    try {
      const task = await this.taskRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.user', 'user')
        .where('user.id = :userId', { userId: user.id })
        .select([
          'task.id',
          'task.title',
          'task.description',
          'task.status',
          'task.created_at',
          'task.updated_at',
          'user.id',
          'user.name',
        ])
        .getMany();

      if (task.length === 0) {
        return {
          statusCode: 400,
          message: `Oops! No task found.`,
          task: [],
        };
      }
      return {
        statusCode: 200,
        message: 'Tasks retrieve successfully',
        task,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateTask(id: number, status: TaskStatus, user) {
    try {
      const task = await this.taskRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.user', 'user')
        .where('task.id = :id', { id })
        .andWhere('user.id = :userId', { userId: user.id })
        .select([
          'task.id',
          'task.title',
          'task.description',
          'task.status',
          'task.created_at',
          'task.updated_at',
          'user.id',
          'user.name',
        ])
        .getOne();

      if (!task) {
        return {
          statusCode: 400,
          message: "you don't have a task to update",
          task: [],
        };
      }

      task.status = status;
      await this.taskRepository.save(task);
      return {
        statusCode: 201,
        message: 'Task updated successfully',
        task,
      };
    } catch (error) {
      throw error;
    }
  }
}
