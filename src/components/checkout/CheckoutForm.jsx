import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../ui/Input';
import { SCHOOLS } from '../../constants/schools';

const schema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^0[235]\d{8}$/, 'Enter a valid Ghanaian phone number (e.g. 0241234567)'),
  school: z.string().min(1, 'Please select your school'),
  hostel: z.string().min(2, 'Please enter your hostel/address'),
});

export default function CheckoutForm({ onValid }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onValid)} id="checkout-form" className="space-y-4">
      <Input
        label="Full Name"
        placeholder="Your full name"
        error={errors.customerName?.message}
        {...register('customerName')}
      />
      <Input
        label="Phone Number"
        placeholder="0241234567"
        type="tel"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">School</label>
        <select
          className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-burgundy ${
            errors.school ? 'border-error' : 'border-border'
          }`}
          {...register('school')}
        >
          <option value="">Select your school</option>
          {SCHOOLS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.school && <p className="text-xs text-error">{errors.school.message}</p>}
      </div>
      <Input
        label="Hostel / Address"
        placeholder="Hostel name, room number or address"
        error={errors.hostel?.message}
        {...register('hostel')}
      />
    </form>
  );
}
