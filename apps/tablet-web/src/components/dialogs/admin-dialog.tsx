'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui';
import type { StoreRoom } from '@repo/types';
import { useDeviceStore } from '@/stores';
import { verifyTabletAdminPassword, registerDevice, getStoreRooms } from '@/lib/devices-api';

type Step = 'password' | 'setup';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storeId: string;
}

export function AdminDialog({ open, onOpenChange, storeId }: Props) {
  const { deviceId } = useDeviceStore();

  const [step, setStep] = useState<Step>('password');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [rooms, setRooms] = useState<StoreRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [deviceName, setDeviceName] = useState('');

  useEffect(() => {
    if (open) {
      setStep('password');
      setPassword('');
      setPasswordError(false);
      setSelectedRoomId('');
      setDeviceName('');
    }
  }, [open]);

  useEffect(() => {
    if (step === 'setup' && storeId) {
      getStoreRooms(storeId).then(setRooms);
    }
  }, [step, storeId]);

  const handlePasswordSubmit = async () => {
    if (!password.trim()) return;

    setIsLoading(true);
    setPasswordError(false);

    try {
      const valid = await verifyTabletAdminPassword(storeId, password);
      if (valid) {
        setStep('setup');
      } else {
        setPasswordError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupSubmit = async () => {
    if (!deviceId) return;

    setIsLoading(true);

    try {
      await registerDevice(storeId, {
        deviceId,
        roomId: selectedRoomId || undefined,
        name: deviceName || undefined,
      });
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={e => e.preventDefault()}
        onEscapeKeyDown={e => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>태블릿 설정</DialogTitle>
        </DialogHeader>

        {step === 'password' && (
          <>
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">관리자 비밀번호를 입력해주세요</p>
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                onKeyDown={e => e.key === 'Enter' && handlePasswordSubmit()}
              />
              {passwordError && <p className="text-sm text-destructive">비밀번호가 일치하지 않습니다</p>}
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleClose} size="touch">
                취소
              </Button>
              <Button onClick={handlePasswordSubmit} disabled={isLoading || !password.trim()} size="touch">
                확인
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'setup' && (
          <>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">디바이스 ID</label>
                <Input value={deviceId ?? ''} disabled className="font-mono text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">연결할 방</label>
                <Select value={selectedRoomId} onValueChange={setSelectedRoomId}>
                  <SelectTrigger>
                    <SelectValue placeholder="방 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map(room => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.roomNumber}번 방 - {room.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">디바이스 이름 (선택)</label>
                <Input
                  placeholder="예: 1번 테이블 태블릿"
                  value={deviceName}
                  onChange={e => setDeviceName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleClose} size="touch">
                취소
              </Button>
              <Button onClick={handleSetupSubmit} disabled={isLoading} size="touch">
                저장
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
