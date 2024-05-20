import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.enum';
import { TaskDto } from './dto/task.dto';
import { AuthGuard } from 'src/Auth/auth.guard.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Body() createTask: TaskDto, @Request() req) {
    const user = req.user;
    const { statusCode, message, task } = await this.taskService.createTask(
      createTask,
      user,
    );
    if (statusCode !== 200) {
      return {
        statusCode,
        message,
        task: [],
      };
    }

    return {
      statusCode,
      message,
      task,
    };
  }
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const user = req.user;
    const { statusCode, message, task } = await this.taskService.getTaskById(
      id,
      user,
    );
    if (statusCode === 400) {
      return {
        statusCode,
        message,
      };
    }
    return { statusCode, message, task };
  }
  @UseGuards(AuthGuard)
  @Get()
  async allTasks(@Request() req) {
    const user = req.user;
    const { statusCode, message, task } = await this.taskService.allTasks(user);
    if (task.length < 1) {
      return {
        statusCode: +statusCode,
        message,
        task,
      };
    }
    return {
      statusCode: +statusCode,
      message,
      task,
    };
  }
  @UseGuards(AuthGuard)
  @Patch('/:id/status')
  async updateTask(
    @Param('id') id: number,
    @Body('status') status: TaskStatus,
    @Request() req,
  ) {
    const user = req.user;

    const { statusCode, message, task } = await this.taskService.updateTask(
      id,
      status,
      user,
    );
    if (statusCode !== 200) {
      return {
        statusCode,
        message,
        task,
      };
    }

    return { statusCode, message, task };
  }
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const user = req.user;

    const task = await this.taskService.deleteTaskById(id, user);
    if (task.statusCode !== 200) {
      return {
        statusCode: task.statusCode,
        message: task.message,
        task: [],
      };
    }
    return {
      statusCode: task.statusCode,
      message: task.message,
      task: task.deletedTask,
    };
  }
}
