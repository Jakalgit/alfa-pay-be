import { Injectable } from '@nestjs/common';
import { SendRequestDto } from "./dto/send-request.dto";
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RequestService {
  private bot: TelegramBot;
  private readonly chatIds: string[];

  constructor(
    private configService: ConfigService
  ) {
    const token = this.configService.get<string>('BOT_TOKEN');
    const SENDING_IDS = this.configService.get<string>('SENDING_IDS');

    this.chatIds = JSON.parse(SENDING_IDS);

    if (!token || !this.chatIds) {
      throw new Error('Telegram credentials error');
    }

    this.bot = new TelegramBot(token, { polling: false });
  }

  async sendRequest(dto: SendRequestDto) {
    try {
      const text =
        `<b>У вас новая заявка:</b>\n` +
        `Название проекта: <b>${dto.projectName}</b>\n` +
        `Идентификатор заявителя: <b>${dto.identifier}</b>\n` +
        `Тип заявки: <b>${dto.requestType}</b>`;

        await Promise.all(
          this.chatIds.map((chatId) => {
            try {
              this.bot.sendMessage(chatId, text.toString(), { parse_mode: "HTML" });
            } catch (e) {
              console.log(`chatId (${chatId}):`, e.request.body);
            }
          })
        );

        return {
          success: true,
        }
    } catch (error) {
      console.error(error);
      return {
        success: false,
      }
    }
  }
}
