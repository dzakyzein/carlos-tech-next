// app/dashboard/tools/page.jsx
import { PrismaClient } from '@prisma/client';
import ToolsClient from './ToolsClient';

const prisma = new PrismaClient();

// Fungsi untuk mengambil data dari server
async function getTools() {
  const tools = await prisma.tool.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return tools;
}

export default async function ToolsPage() {
  // Ambil data alat
  const tools = await getTools();

  // Oper data ke Client Component
  return <ToolsClient tools={tools} />;
}
