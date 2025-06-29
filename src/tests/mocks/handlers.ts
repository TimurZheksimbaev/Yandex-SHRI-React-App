import { http, HttpResponse, delay } from 'msw';

const mockAggregateResult = {
  total_spend_galactic: 1000,
  rows_affected: 100,
  less_spent_at: 10,
  big_spent_at: 100,
  less_spent_value: 5,
  big_spent_value: 200,
  average_spend_galactic: 50,
  big_spent_civ: 'Alpha',
  less_spent_civ: 'Beta'
};

export const handlers = [
  http.post('http://localhost:3000/aggregate', async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(JSON.stringify({ ...mockAggregateResult, rows_affected: 25 }) + '\n'));
        await delay(300);
        
        controller.enqueue(encoder.encode(JSON.stringify({ ...mockAggregateResult, rows_affected: 50 }) + '\n'));
        await delay(300);
        
        controller.enqueue(encoder.encode(JSON.stringify({ ...mockAggregateResult, rows_affected: 75 }) + '\n'));
        await delay(300);
        
        controller.enqueue(encoder.encode(JSON.stringify(mockAggregateResult) + '\n'));
        controller.close();
      }
    });

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  http.get('http://localhost:3000/report', async ({ request }) => {
    const url = new URL(request.url);
    const size = url.searchParams.get('size') || '1';
    const withErrors = url.searchParams.get('withErrors') === 'on';
    
    let csvContent = 'date,civilization,spend_galactic\n';
    
    const numRows = parseInt(size) * 10;
    for (let i = 0; i < numRows; i++) {
      const date = `2023-01-${(i % 28) + 1}`;
      const civ = i % 2 === 0 ? 'Alpha' : 'Beta';
      const spend = Math.floor(Math.random() * 100) + 1;
      
      if (withErrors && i % 5 === 0) {
        csvContent += `${date},${civ},invalid_value\n`;
      } else {
        csvContent += `${date},${civ},${spend}\n`;
      }
    }
    
    await delay(1000);
    
    return new HttpResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="galactic-report.csv"',
      },
    });
  }),
]; 