import { Injectable } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeFormat,
} from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root',
})

export class BarcodeScannerService {
  async startScan(): Promise<string | null> {
    const { supported } = await BarcodeScanner.isSupported();
    if (!supported) {
      alert('Escaneo de códigos de barra no soportado en este dispositivo.');
      return null;
    }

    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.Ean13], // Usar EAN-13
    });

    // Verifica si hay códigos escaneados y devuelve el valor
    return barcodes.length ? barcodes[0].rawValue || null : null;
  }
}
