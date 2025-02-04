import { Order } from './order';

const shouldSendLogToDiscord = process.env.NODE_ENV === 'production' && !!process.env.DISCORD_LOGS_WEBHOOK_URL;

const BOT_NAME = 'Spero Logs';
const BOT_AVATAR_URL = `${process.env.NEXTAUTH_URL}/images/logo.png`;

/**
 * Converts any argument into a string suitable for sending in Discord.
 * - If it's an Error, we return { stack, message }
 * - Otherwise, we JSON.stringify objects
 */
function stringifyArg(arg: unknown): string {
    if (arg instanceof Error) {
      // Return a JSON string with stack & message
      return JSON.stringify(
        {
          stack: arg.stack ?? 'No stack available',
          message: arg.message ?? 'No message available',
        },
        null,
        2
      );
    } else if (typeof arg === 'object') {
      try {
        return JSON.stringify(arg, null, 2);
      } catch (jsonErr) {
        return String(arg);
      }
    } else {
      return String(arg);
    }
}

/**
 * Returns the current time in EST/EDT formatted as [MM/DD/YYYY h:mm AM/PM EST].
 */
function getESTTimestamp(): string {
    const date = new Date();
    const dateStr = date.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  
    return `${dateStr.replace(',', '')} EST`;
  }
  

/**
 * Sends a log message to the Discord logs webhook, if allowed.
 */
async function sendLogToDiscord(level: string, args: unknown[]) {
    if (!shouldSendLogToDiscord) {
      // Not in production or no webhook set
      return;
    }
  
    const timestamp = getESTTimestamp();
    const combinedMessage = args.map(stringifyArg).join(' ');
  
    // Discord logs webhook
    const webhookUrl = process.env.DISCORD_LOGS_WEBHOOK_URL as string;
  
    const payload = {
      username: BOT_NAME,
      avatar_url: BOT_AVATAR_URL,
      content: `[${timestamp}] **[${level.toUpperCase()}]** ${combinedMessage}`,
    };

    try {

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error(
          `Failed to send log to Discord. Status code: ${res.status} - ${res.statusText}`
        );
      }
    } catch (err) {
      console.error('Failed to send log to Discord (exception thrown):', err);
    }
}

export const logger = {
    log: (...args: unknown[]) => {
      console.log(...args);
      sendLogToDiscord('log', args);
    },
    info: (...args: unknown[]) => {
      console.info(...args);
      sendLogToDiscord('info', args);
    },
    warn: (...args: unknown[]) => {
      console.warn(...args);
      sendLogToDiscord('warn', args);
    },
    error: (...args: unknown[]) => {
      console.error(...args);
      sendLogToDiscord('error', args);
    },
    debug: (...args: unknown[]) => {
      console.debug(...args);
      sendLogToDiscord('debug', args);
    },
};

export async function sendPurchaseEmbed(order: Order) {
    const webhookUrl = process.env.DISCORD_BUYS_WEBHOOK_URL;
    if (!webhookUrl) {
        return;
    }

    const brandColor = parseInt('767cd8', 16);
  
    const fields = [
      {
        name: 'Order ID',
        value: order.id || 'N/A',
        inline: true,
      },
      {
        name: 'Created',
        value: order.created?.toString() || 'N/A',
        inline: true,
      },
      {
        name: 'Product ID',
        value: order.product_id || 'N/A',
        inline: true,
      },
      {
        name: 'Payment Status',
        value: order.payment_status || 'N/A',
        inline: true,
      },
      {
        name: 'Fulfillment Option',
        value: order.fulfillment_option || 'N/A',
        inline: true,
      },
      {
        name: 'Fulfillment Status',
        value: order.fulfillment_status || 'N/A',
        inline: true,
      },
      {
        name: 'Checkout ID',
        value: order.checkout_id || 'N/A',
        inline: true,
      },
      {
        name: 'Name',
        value: order.name || 'N/A',
        inline: true,
      },
      {
        name: 'Email',
        value: order.email || 'N/A',
        inline: true,
      },
      {
        name: 'Phone',
        value: order.phone || 'N/A',
        inline: true,
      },
      {
        name: 'Address',
        value: order.address
          ? `${order.address.line1 || ''}\n${order.address.line2 || ''}\n${
              order.address.city || ''
            } ${order.address.state || ''}\n${order.address.postal_code || ''}`
          : 'N/A',
        inline: false,
      },
      {
        name: 'Notes',
        value: order.notes || 'N/A',
        inline: false,
      },
    ];
  
    const embed = {
      title: 'New Purchase!',
      color: brandColor,
      fields,
      timestamp: new Date().toISOString(),
    };
  
    const payload = {
      username: BOT_NAME,
      avatar_url: BOT_AVATAR_URL,
      content: '@everyone',
      embeds: [embed],
    };
  
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error(
          `Failed to send purchase embed to Discord. Status code: ${res.status} - ${res.statusText}`
        );
      }
    } catch (err) {
      console.error('Failed to send purchase embed (exception thrown):', err);
    }
}