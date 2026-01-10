import type { ReactNode } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui';
import { Building2, MapPin, MoreHorizontal, Plus, Search } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  address: string;
  tables: number;
  games: number;
  status: 'active' | 'inactive' | 'maintenance';
  manager: string;
}

const stores: Store[] = [
  {
    id: '1',
    name: '강남점',
    address: '서울시 강남구 역삼동 123-45',
    tables: 20,
    games: 150,
    status: 'active',
    manager: '김관리',
  },
  {
    id: '2',
    name: '홍대점',
    address: '서울시 마포구 홍익로 67-89',
    tables: 15,
    games: 120,
    status: 'active',
    manager: '이관리',
  },
  {
    id: '3',
    name: '신촌점',
    address: '서울시 서대문구 신촌로 34-56',
    tables: 12,
    games: 100,
    status: 'maintenance',
    manager: '박관리',
  },
  {
    id: '4',
    name: '건대점',
    address: '서울시 광진구 능동로 78-90',
    tables: 18,
    games: 130,
    status: 'active',
    manager: '최관리',
  },
  {
    id: '5',
    name: '잠실점',
    address: '서울시 송파구 올림픽로 12-34',
    tables: 25,
    games: 180,
    status: 'inactive',
    manager: '정관리',
  },
];

function getStatusBadge(status: Store['status']): ReactNode {
  switch (status) {
    case 'active':
      return <Badge variant="complete">운영중</Badge>;
    case 'inactive':
      return <Badge variant="secondary">휴업</Badge>;
    case 'maintenance':
      return <Badge variant="warning">점검중</Badge>;
  }
}

export default function StoresPage(): ReactNode {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">매장 관리</h1>
          <p className="text-muted-foreground">전체 매장 목록 및 관리</p>
        </div>
        <Button>
          <Plus className="size-4" />
          매장 추가
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 매장</CardDescription>
            <CardTitle className="text-3xl">{stores.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>운영중</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {stores.filter((s) => s.status === 'active').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>총 테이블</CardDescription>
            <CardTitle className="text-3xl">{stores.reduce((acc, s) => acc + s.tables, 0)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>총 보유 게임</CardDescription>
            <CardTitle className="text-3xl">{stores.reduce((acc, s) => acc + s.games, 0)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>매장 목록</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="매장 검색..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>매장명</TableHead>
                <TableHead>주소</TableHead>
                <TableHead className="text-center">테이블</TableHead>
                <TableHead className="text-center">보유 게임</TableHead>
                <TableHead className="text-center">상태</TableHead>
                <TableHead>담당자</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="size-4 text-primary" />
                      </div>
                      <span className="font-medium">{store.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="size-4" />
                      <span className="text-sm">{store.address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{store.tables}</TableCell>
                  <TableCell className="text-center">{store.games}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(store.status)}</TableCell>
                  <TableCell>{store.manager}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
