import { utilities } from 'nest-winston';
import * as path from 'node:path';
import * as winston from 'winston';
import {
  ConsoleTransportInstance,
  ConsoleTransportOptions,
  FileTransportInstance,
  FileTransportOptions,
} from 'winston/lib/winston/transports';

const { transports, format } = winston;
const { Console } = transports;
const DIR_PATH = path.join(__dirname, './../../../../logs/');

const consoleOptions: ConsoleTransportOptions = {
  format:
    process.env.NODE_ENV === 'production'
      ? format.json()
      : format.combine(
          format.timestamp(),
          format.ms(),
          format.splat(),
          format.errors(),
          utilities.format.nestLike('simple-nest-js-template', {
            prettyPrint: true,
            colors: true,
          }),
        ),
  level: 'debug',
};
const logConsole: ConsoleTransportInstance = new Console(consoleOptions);

const fileOptions: FileTransportOptions = {
  dirname: DIR_PATH,
  filename: 'simple-nest-js-template.log',
  format: format.combine(format.timestamp(), format.ms(), format.logstash()),
  level: 'debug',
};
const logFile: FileTransportInstance = new transports.File(fileOptions);

export const winstonConfig = {
  transports: [logConsole, logFile],
};
