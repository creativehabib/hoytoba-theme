import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shuffleArray (array: any[]){
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


export function formatDuration(seconds: number){
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs > 0 ? `${hrs}h ` : ''}${mins}m ${secs}s`;
}

export const formatDateToBangla = (timestamp: number|string): string => {
  const date = new Date(timestamp);

  // Step 1: Format Date in Bangla (example: ১৮ সেপ্টেম্বর, ২০২১)
  const formattedDate = new Intl.DateTimeFormat('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  // Step 2: Format Time in Bangla (example: ১১:১২AM)
  const formattedTime = new Intl.DateTimeFormat('bn-BD', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);

  // Combine the date and time
  const formattedDateTime = `${formattedDate} - ${formattedTime}`;

  // Step 3: Convert English numerals to Bangla
  const englishToBangla = (str: string): string => {
    const enToBnMap: { [key: string]: string } = {
      '0': '০',
      '1': '১',
      '2': '২',
      '3': '৩',
      '4': '৪',
      '5': '৫',
      '6': '৬',
      '7': '৭',
      '8': '৮',
      '9': '৯',
    };
    return str.replace(/\d/g, (digit) => enToBnMap[digit]);
  };

  // Convert the full formatted string to Bangla numerals
  return englishToBangla(formattedDateTime);
};

