import { Injectable } from '@angular/core';
import { Trend } from '../trends/models/trend.model';

@Injectable({
  providedIn: 'root',
})
export class TrendUtilsService {
  /**
   * Validates if the given trend object contains all required fields and if those fields are valid.
   * @param trend - The trend object to validate. This parameter is optional.
   * @returns `true` if the trend object is valid, otherwise `false`.
   */
  isTrendValid(trend?: Trend): boolean {
    const requiredFields: (keyof Trend)[] = [
      'title',
      'body',
      'provider',
      'image',
      'url',
    ];

    for (const field of requiredFields) {
      const value = trend?.[field];
      if (!this.isFieldValid(value)) {
        this.setErrorMessage(field);
        return false;
      }
    }
    return true;
  }

  /**
   * Checks if the provided value is valid.
   *
   * A value is considered valid if it is not `undefined` and:
   * - If it is an array, it has at least one element.
   * - If it is a string, it is not empty after trimming whitespace.
   *
   * @param value - The value to be checked for validity.
   * @returns `true` if the value is valid, `false` otherwise.
   */
  isFieldValid(value: any): boolean {
    return (
      value !== undefined &&
      (Array.isArray(value) ? value.length > 0 : value.trim() !== '')
    );
  }

  /**
   * Generates an error message for a given field of the `Trend` object.
   * @param field - The key of the `Trend` object for which the error message is generated.
   * @returns A string containing the error message indicating that the field is required.
   */
  setErrorMessage(field: keyof Trend): string {
    const fieldNames: Record<string, string> = {
      title: 'Título',
      body: 'Descripción',
      provider: 'Proveedor',
      image: 'Url Imagen',
      url: 'URL Noticia',
    };
    return `Se requiere información en este campo: ${
      fieldNames[field] || field
    }`;
  }

  /**
   * Compares the current trend object with the original trend object and returns an object
   * containing only the fields that have been updated.
   * @returns {Partial<Trend>} An object with the updated fields from the current trend.
   */
  getUpdatedFields(
    trend: Trend,
    originalTrend: Trend | undefined
  ): Partial<Trend> {
    const updatedFields: Partial<Trend> = {};
    for (const key in trend) {
      if (trend[key as keyof Trend] !== originalTrend?.[key as keyof Trend]) {
        updatedFields[key as keyof Trend] = trend[key as keyof Trend] as any;
      }
    }
    return updatedFields;
  }
}
