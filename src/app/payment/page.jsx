"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const PaymentForm = ({ searchParams }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const { id, couponCode } = React.use(searchParams) || {};

  const form = useForm({
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  });

  const { fetchData, data, loading, error } = useFetch();

  useEffect(() => {
    if (error) {
      setSubmitError(error.message || "An error occurred. Please try again.");
    }
    if (data?.success) {
      toast({
        title: data?.message,
      });
      router.push("/my-courses");
    }
  }, [error, data]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return month < 10 ? `0${month}` : `${month}`;
  });

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const validateCardNumber = (number) => {
    const digits = number.replace(/\s/g, "");
    if (!/^\d{16}$/.test(digits)) return false;

    let sum = 0;
    let isEven = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setSubmitError("");

      if (!id) {
        throw new Error("Missing course ID");
      }

      const expiryDate = `${
        formData.expiryMonth
      }/${formData.expiryYear.substring(2)}`;

      await fetchData({
        url: `/api/courses/payment?id=${encodeURIComponent(id)}`,
        method: "POST",
        body: JSON.stringify({
          couponCode,
          paymentInfo: {
            ...formData,
            expiryDate,
            cardNumber: formData.cardNumber.replace(/\s/g, ""),
          },
        }),
      });
    } catch (error) {
      setSubmitError(error.message || "Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg"
        >
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Enter your card information to complete the payment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {submitError && (
                <Alert variant="destructive">
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="cardNumber"
                rules={{
                  required: "Card number is required",
                  validate: {
                    validCard: (value) =>
                      validateCardNumber(value) ||
                      "Please enter a valid card number",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          if (formatted.length <= 19) {
                            field.onChange(formatted);
                          }
                        }}
                        inputMode="numeric"
                        autoComplete="cc-number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardHolder"
                rules={{
                  required: "Cardholder name is required",
                  pattern: {
                    value: /^[a-zA-Z\s'-]+$/,
                    message: "Please enter a valid name",
                  },
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Holder Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name as shown on card"
                        {...field}
                        autoComplete="cc-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryMonth"
                  rules={{ required: "Month is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Month</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryYear"
                  rules={{ required: "Year is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cvv"
                rules={{
                  required: "CVV is required",
                  pattern: {
                    value: /^\d{3,4}$/,
                    message: "CVV must be 3 or 4 digits",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123"
                        {...field}
                        maxLength={4}
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        className="max-w-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? "Processing..." : "Pay Now"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default PaymentForm;
