from google import genai
from google.genai import types
import pandas as pd
from PIL import Image
from io import BytesIO

# Initialize the Gemini client
client = genai.Client()

def generate_styled_image(prompt, style_image_path):
    """
    Generates an image based on the given prompt, using the style of the image
    at style_image_path.

    Args:
        prompt: The text description of the image to generate.
        style_image_path: The path to the image whose style should be used.

    Returns:
        A PIL Image object if successful, None otherwise.
    """
    try:
        # Load the style image
        with open(style_image_path, "rb") as style_image_file:
            style_image_data = style_image_file.read()

        # Generate content using the Gemini API (adjust based on the actual model and input format)
        response = client.models.generate_content(
            model="gemini-2.0-image-generation",  # Adjust to correct model
            contents=[
                types.Content(content_type="TEXT", text=prompt),
                types.Content(content_type="IMAGE", image_data=style_image_data)
            ],
            config=types.GenerateContentConfig(
                response_modalities=['IMAGE']
            )
        )

        # Extract and return the generated image from the response
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                return Image.open(BytesIO(part.inline_data.data))
        return None
    except Exception as e:
        print(f"Error generating image: {e}")
        return None

if __name__ == "__main__":
    # Load the plant data from the CSV file
    csv_file_path = 'data_fetch/cleaned_plants.csv'
    try:
        plants_df = pd.read_csv(csv_file_path)
    except FileNotFoundError:
        print(f"Error: CSV file not found at {csv_file_path}")
        exit()

    # Path to the tomato image (your style reference)
    style_image_path = 'tomato.png'  # Replace with the actual path

    # Iterate through each plant in the CSV and generate an image
    for index, row in plants_df.iterrows():
        common_name = row.get('common_name')
        scientific_name = row.get('scientific_name')

        if common_name:
            prompt = f"A drawing of {common_name}, in a loose, painterly style with visible brushstrokes and slightly soft edges, similar to a drawing of a tomato."
            if scientific_name:
                prompt += f" The scientific name is {scientific_name}."
            else:
                prompt += " Depict its typical appearance."

            print(f"Generating image for: {common_name} ({scientific_name if scientific_name else 'N/A'})")
            generated_image = generate_styled_image(prompt, style_image_path)

            if generated_image:
                # Save the generated image
                output_filename = f"generated_images/{common_name.replace(' ', '_')}.png"
                generated_image.save(output_filename)
                print(f"Image saved to: {output_filename}")
            else:
                print("Failed to generate image.")
        else:
            print(f"Skipping row {index} due to missing common name.")

    print("Image generation process complete.")
